/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  getAccessToken,
  getOnboardingStatus,
  logout,
  ONBOARDING_STATUS_VALUES,
  removeOnboardingStatus,
  setAccessToken,
  setOnboardingStatusComplete,
  setOnboardingStatusIncomplete,
  setRefreshToken,
} from '@/utils/handleToken.util';
import { CustomError } from './custom-error';
import { z } from 'zod';
import { replacer, silentParse } from '@/utils/config.util';
import { postUpdateToken } from './auth.service';
import { UserSchema } from '@/types/user-management.type';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const EmptyShape = {};
type EmptyShape = typeof EmptyShape;

interface RequestInitWithSchema<T extends z.ZodRawShape> extends RequestInit {
  shape?: T;
  skipCheckOnboarding?: boolean;
}

const getApiResponseOkSchema = <T extends z.ZodRawShape>(rawShape: T) =>
  z
    .object({ ok: z.literal(true), statusCode: z.number() })
    .merge(z.object(rawShape))
    .strict();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const FETCH_REVALIDATE_TIME = 60; // 1분

class Instance {
  constructor(private readonly baseUrl: string = BASE_URL ?? '') {}

  async fetchWithConfig<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    method: HttpMethod,
    body?: any,
    options: RequestInitWithSchema<T> = {},
  ) {
    const { shape, ...pureOptions } = options;
    const config: RequestInit = {
      method,
      next: { revalidate: FETCH_REVALIDATE_TIME },
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...pureOptions?.headers,
      },
      ...(body && { body: JSON.stringify(body, replacer) }),
    };

    const getNotifiedUsingToast = shape !== undefined && method === 'GET';
    const schema = shape
      ? getApiResponseOkSchema(shape)
      : // NOTE this `as T` is safe because `shape` is undefined
        getApiResponseOkSchema(EmptyShape as T);

    const res = await fetch(new URL(url, this.baseUrl).toString(), config);

    // response가 없는 경우
    if (res.statusText === 'No Content') {
      if (res.status >= 400) {
        throw new CustomError(res.status, 'No Content');
      }
      return silentParse(
        schema,
        {
          ok: true,
          statusCode: res.status,
        },
        {
          useToast: getNotifiedUsingToast,
        },
      );
    }

    // response가 있는 경우
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.error('fetchWithConfig error: ', e);
    }
    if (!data.ok) {
      throw new CustomError(
        data.statusCode,
        data.error?.message || '알 수 없는 오류',
      );
    }

    return silentParse(schema, data, { useToast: getNotifiedUsingToast });
  }

  async get<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.fetchWithConfig<T>(url, 'GET', undefined, options);
  }
  async delete<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'DELETE', undefined, options);
  }
  async post<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'POST', body, options);
  }
  async put<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'PUT', body, options);
  }
  async patch<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'PATCH', body, options);
  }
}

export const instance = new Instance();

const USER_URL = '/v2/user-management/users/me';
const ONBOARDING_URL = '/onboarding';

// CSR 환경에서만 사용 가능
class AuthInstance {
  private isServer() {
    return typeof window === 'undefined';
  }

  private createAuthOptions<T extends z.ZodRawShape = EmptyShape>(
    options: RequestInitWithSchema<T>,
  ) {
    if (this.isServer()) {
      throw new CustomError(
        403,
        '인증이 필요한 요청은 서버사이드에서 호출 불가합니다.',
      );
    }

    const accessToken = getAccessToken();
    const authOptions: RequestInitWithSchema<T> = {
      ...options,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    };
    return authOptions;
  }

  // 토큰 갱신 요청이 진행 중인 경우 그 결과를 재사용
  private tokenUpdatePromise: Promise<{
    accessToken: string;
    refreshToken: string;
  }> | null = null;

  private async updateToken() {
    try {
      if (this.tokenUpdatePromise) {
        return await this.tokenUpdatePromise;
      }

      this.tokenUpdatePromise = postUpdateToken();
      const tokens = await this.tokenUpdatePromise;

      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);

      return tokens;
    } catch (e) {
      const error = e as CustomError;
      removeOnboardingStatus();
      await logout();
      throw error;
    } finally {
      this.tokenUpdatePromise = null;
    }
  }

  // 토큰 만료 시 토큰을 갱신하고 다시 요청
  private async withTokenRetry<T>(
    operation: () => Promise<T>,
    { onError }: { onError?: (error: CustomError) => void } = {},
  ): Promise<T> {
    try {
      return await operation();
    } catch (e) {
      const error = e as CustomError;
      if (error.statusCode === 401) {
        await this.updateToken();
        return await operation();
      }
      onError?.(error);
      throw error;
    }
  }

  async authFetchWithConfig<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    method: HttpMethod,
    body?: unknown,
    options: RequestInitWithSchema<T> = {
      skipCheckOnboarding: false,
    },
  ) {
    const authOptions = this.createAuthOptions(options);

    if (!options.skipCheckOnboarding) {
      await this.checkOnboarding();
    }

    const fetchOperation = async () =>
      instance.fetchWithConfig<T>(url, method, body, authOptions);
    return await this.withTokenRetry(fetchOperation, {
      onError: (error) => {
        if (error.statusCode === 429) {
          throw new CustomError(429, '요청이 너무 많습니다.');
        }
      },
    });
  }

  private async checkOnboarding() {
    let onboardingStatus = getOnboardingStatus();

    if (!onboardingStatus) {
      onboardingStatus = await this.setOnboardingStatus();
    }

    switch (onboardingStatus) {
      case ONBOARDING_STATUS_VALUES.COMPLETE:
        break;
      case ONBOARDING_STATUS_VALUES.INCOMPLETE:
        window.location.href = ONBOARDING_URL;
        throw new CustomError(401, '온보딩이 완료되지 않았습니다.');
      default:
        throw new CustomError(401, '온보딩 상태를 확인할 수 없습니다.');
    }

    return onboardingStatus;
  }

  private async setOnboardingStatus() {
    const authOptions = this.createAuthOptions({
      shape: {
        user: UserSchema,
      },
    });

    const fetchOperation = async () => {
      const res = await instance.get(USER_URL, authOptions);
      const isOnboardingComplete = res.user.onboardingComplete;

      if (!isOnboardingComplete) {
        setOnboardingStatusIncomplete();
        return ONBOARDING_STATUS_VALUES.INCOMPLETE;
      } else {
        setOnboardingStatusComplete();
        return ONBOARDING_STATUS_VALUES.COMPLETE;
      }
    };

    return await this.withTokenRetry(fetchOperation, {
      onError: () => {
        removeOnboardingStatus();
      },
    });
  }

  async get<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.authFetchWithConfig<T>(url, 'GET', undefined, options);
  }
  async delete<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.authFetchWithConfig<T>(url, 'DELETE', undefined, options);
  }

  async post<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.authFetchWithConfig<T>(url, 'POST', body, options);
  }
  async put<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.authFetchWithConfig<T>(url, 'PUT', body, options);
  }

  async patch<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.authFetchWithConfig<T>(url, 'PATCH', body, options);
  }
}

export const authInstance = new AuthInstance();
