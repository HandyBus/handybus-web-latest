import { Cookies } from 'react-cookie';

const REFRESH_TOKEN = 'refresh-token';
const ACCESS_TOKEN = 'access-token';

const REFRESH_EXPIRE_TIME = 3600 * 1000 * 24; // 24시간
const ACCESS_EXPIRE_TIME = 3600 * 1000 * 1; // 1시간

const OPTIONS = {
  secure: true,
  sameSite: 'strict',
  path: '/',
} as const;

const cookieStore = new Cookies();

export const getRefreshToken = async () => {
  const session = await cookieStore.get(REFRESH_TOKEN);
  return session;
};

export const setRefreshToken = (value: string) => {
  const expires = new Date(Date.now() + REFRESH_EXPIRE_TIME);
  cookieStore.set(REFRESH_TOKEN, value, { ...OPTIONS, expires });
};

export const removeRefreshToken = () => {
  cookieStore.remove(REFRESH_TOKEN);
};

export const getAccessToken = async () => {
  const session = await cookieStore.get(ACCESS_TOKEN);
  return session;
};

export const setAccessToken = (value: string) => {
  const expires = new Date(Date.now() + ACCESS_EXPIRE_TIME);
  cookieStore.set(ACCESS_TOKEN, value, { ...OPTIONS, expires });
};

export const removeAccessToken = () => {
  cookieStore.remove(ACCESS_TOKEN);
};
