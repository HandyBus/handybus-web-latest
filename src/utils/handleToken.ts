import { cookies } from 'next/headers';

// TODO: 추후 백엔드 토큰 만료 시간에 맞추어서 수정해야 함
const ACCESS_EXPIRATION = 3600 * 1000 * 3; // 3시간
const REFRESH_EXPIRATION = 3600 * 1000 * 24; // 24시간

const OPTIONS = {
  secure: false,
  sameSite: 'lax',
  path: '/',
} as const;

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const cookieStore = cookies();

export const setAccessToken = (value: string) => {
  const expiration = new Date(Date.now() + ACCESS_EXPIRATION);
  cookieStore.set(ACCESS_TOKEN, value, {
    ...OPTIONS,
    expires: expiration,
  });
};

export const getAccessToken = () => {
  return cookieStore.get(ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  cookieStore.delete(ACCESS_TOKEN);
};

export const setRefreshToken = (value: string) => {
  const expiration = new Date(Date.now() + REFRESH_EXPIRATION);
  cookieStore.set(REFRESH_TOKEN, value, {
    ...OPTIONS,
    expires: expiration,
  });
};

export const getRefreshToken = () => {
  return cookieStore.get(REFRESH_TOKEN);
};

export const removeRefreshToken = () => {
  cookieStore.delete(REFRESH_TOKEN);
};
