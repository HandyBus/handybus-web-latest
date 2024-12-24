import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_AT,
} from '@/constants/token';
import { SESSION } from '@/utils/handleSession';
import axios from 'axios';
import { cookies } from 'next/headers';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export const authInstance = axios.create({
  baseURL: new URL('api', DOMAIN_URL).toString(),
  timeout: 20000,
  withCredentials: true,
});

authInstance.interceptors.request.use(async (req) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();

    const cookieData = {
      [REFRESH_TOKEN]: getCookieValue(cookieStore, REFRESH_TOKEN),
      [REFRESH_TOKEN_EXPIRES_AT]: getCookieValue(
        cookieStore,
        REFRESH_TOKEN_EXPIRES_AT,
      ),
      [ACCESS_TOKEN]: getCookieValue(cookieStore, ACCESS_TOKEN),
      [ACCESS_TOKEN_EXPIRES_AT]: getCookieValue(
        cookieStore,
        ACCESS_TOKEN_EXPIRES_AT,
      ),
      [SESSION]: getCookieValue(cookieStore, SESSION),
    };

    req.headers.Cookie = createCookieString(cookieData);
  }

  return req;
});

const getCookieValue = (cookieStore: ReturnType<typeof cookies>, key: string) =>
  cookieStore.get(key)?.value ?? '';

const createCookieString = (cookieData: Record<string, string>) =>
  Object.entries(cookieData)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
