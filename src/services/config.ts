/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  updateToken,
} from '@/utils/handleToken';
import { CustomError } from './custom-error';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiResponse<T> = {
  ok: boolean;
  statusCode: number;
  error?: {
    message: string;
    stack: string[];
  };
} & T;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

class Instance {
  constructor(private readonly baseUrl: string = BASE_URL ?? '') {}

  async fetchWithConfig<T>(
    url: string,
    method: HttpMethod,
    body?: any,
    options: RequestInit = {},
  ) {
    const config: RequestInit = {
      method,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const res = await fetch(new URL(url, this.baseUrl).toString(), config);

    // response가 없는 경우
    if (res.statusText === 'No Content') {
      if (res.status >= 400) {
        throw new CustomError(res.status, 'No Content');
      }
      return {
        ok: true,
        statusCode: res.status,
      } as ApiResponse<T>;
    }

    // response가 있는 경우
    const data = (await res.json()) as ApiResponse<T>;
    if (!data.ok) {
      throw new CustomError(
        data.statusCode,
        data.error?.message || '알 수 없는 오류',
      );
    }

    return data;
  }

  async get<T>(url: string, options?: RequestInit) {
    return this.fetchWithConfig<T>(url, 'GET', undefined, options);
  }
  async delete<T>(url: string, options?: RequestInit) {
    return await this.fetchWithConfig<T>(url, 'DELETE', undefined, options);
  }
  async post<T>(url: string, body: any, options?: RequestInit) {
    return await this.fetchWithConfig<T>(url, 'POST', body, options);
  }
  async put<T>(url: string, body: any, options?: RequestInit) {
    return await this.fetchWithConfig<T>(url, 'PUT', body, options);
  }
  async patch<T>(url: string, body: any, options?: RequestInit) {
    return await this.fetchWithConfig<T>(url, 'PATCH', body, options);
  }
}

export const instance = new Instance();

class AuthInstance {
  async authFetchWithConfig<T>(
    url: string,
    method: HttpMethod,
    body?: unknown,
    options: RequestInit = {},
  ) {
    const accessToken = await getAccessToken();
    const authOptions = {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    };

    try {
      return await instance.fetchWithConfig<T>(url, method, body, authOptions);
    } catch (e) {
      const error = e as CustomError;
      const isServer = typeof window === 'undefined';
      if (error.statusCode === 401 && !isServer) {
        try {
          const tokens = await updateToken();
          await Promise.all([
            setAccessToken(tokens.accessToken, tokens.accessTokenExpiresAt),
            setRefreshToken(tokens.refreshToken, tokens.refreshTokenExpiresAt),
          ]);
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
        }
      }
      throw error;
    }
  }

  async get<T>(url: string, options?: RequestInit) {
    return this.authFetchWithConfig<T>(url, 'GET', undefined, options);
  }
  async delete<T>(url: string, options?: RequestInit) {
    return this.authFetchWithConfig<T>(url, 'DELETE', undefined, options);
  }

  async post<T>(url: string, body: any, options?: RequestInit) {
    return this.authFetchWithConfig<T>(url, 'POST', body, options);
  }
  async put<T>(url: string, body: any, options?: RequestInit) {
    return this.authFetchWithConfig<T>(url, 'PUT', body, options);
  }

  async patch<T>(url: string, body: any, options?: RequestInit) {
    return this.authFetchWithConfig<T>(url, 'PATCH', body, options);
  }
}

export const authInstance = new AuthInstance();
