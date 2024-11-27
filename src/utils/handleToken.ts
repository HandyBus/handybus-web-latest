import { Cookies } from 'react-cookie';

export const REFRESH_TOKEN = 'refresh-token';
export const ACCESS_TOKEN = 'access-token';

export const REFRESH_EXPIRE_TIME = 3600 * 1000 * 24 * 5; // 5일
export const ACCESS_EXPIRE_TIME = 3600 * 1000 * 1; // 1시간

export const OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
} as const;

const cookieStore = new Cookies();

export const setRefreshToken = (value: string) => {
  const expires = new Date(Date.now() + REFRESH_EXPIRE_TIME);
  cookieStore.set(REFRESH_TOKEN, value, { ...OPTIONS, expires });
};

export const removeRefreshToken = () => {
  cookieStore.remove(REFRESH_TOKEN);
};

export const setAccessToken = (value: string) => {
  const expires = new Date(Date.now() + ACCESS_EXPIRE_TIME);
  cookieStore.set(ACCESS_TOKEN, value, { ...OPTIONS, expires });
};

export const removeAccessToken = () => {
  cookieStore.remove(ACCESS_TOKEN);
};
