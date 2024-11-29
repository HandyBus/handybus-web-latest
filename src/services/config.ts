import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token';
import { SESSION } from '@/utils/handleSession';
import axios from 'axios';

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
    const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;
    const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
    const session = cookieStore.get(SESSION)?.value;
    req.headers.Cookie = `${REFRESH_TOKEN}=${refreshToken}; ${ACCESS_TOKEN}=${accessToken}; ${SESSION}=${session}`;
  }

  return req;
});
