/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  getAccessToken,
  logout,
  setAccessToken,
  setRefreshToken,
} from '@/utils/handleToken.util';
import { CustomError } from './custom-error';
import { z } from 'zod';
import { replacer, silentParse } from '@/utils/config.util';
import { postUpdateToken } from './auth.service';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const EmptyShape = {};
type EmptyShape = typeof EmptyShape;

interface RequestInitWithSchema<T extends z.ZodRawShape> extends RequestInit {
  shape?: T;
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
    const data = await res.json();
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

// CSR 환경에서만 사용 가능
class AuthInstance {
  async authFetchWithConfig<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    method: HttpMethod,
    body?: unknown,
    options: RequestInitWithSchema<T> = {},
  ) {
    const isServer = typeof window === 'undefined';
    if (isServer) {
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

    try {
      return await instance.fetchWithConfig<T>(url, method, body, authOptions);
    } catch (e) {
      const error = e as CustomError;

      if (error.statusCode === 429) {
        throw new CustomError(429, '요청이 너무 많습니다.');
      }

      if (error.statusCode === 401) {
        try {
          const tokens = await postUpdateToken();
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          return await instance.fetchWithConfig<T>(url, method, body, {
            ...authOptions,
            headers: {
              ...authOptions.headers,
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
        } catch (e) {
          const error = e as CustomError;
          console.error('로그인 시간 만료: ', error.message);
          await logout();
        }
      }
      throw error;
    }
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
