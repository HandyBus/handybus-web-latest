import { Cookies } from 'react-cookie';

const cookies = new Cookies();

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

export const setAccessToken = (value: string) => {
  const expiration = new Date(Date.now() + ACCESS_EXPIRATION);
  return cookies.set(ACCESS_TOKEN, value, { ...OPTIONS, expires: expiration });
};

export const getAccessToken = () => {
  return cookies.get(ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  cookies.remove(ACCESS_TOKEN);
};

export const setRefreshToken = (value: string) => {
  const expiration = new Date(Date.now() + REFRESH_EXPIRATION);
  return cookies.set(REFRESH_TOKEN, value, { ...OPTIONS, expires: expiration });
};

export const getRefreshToken = () => {
  return cookies.get(REFRESH_TOKEN);
};

export const removeRefreshToken = () => {
  cookies.remove(REFRESH_TOKEN);
};
