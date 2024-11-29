export const REFRESH_TOKEN = 'refresh-token';
export const ACCESS_TOKEN = 'access-token';

export const REFRESH_EXPIRE_TIME = 3600 * 1000 * 24 * 5; // 5일
export const ACCESS_EXPIRE_TIME = 3600 * 1000 * 1; // 1시간

export const OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  path: '/',
} as const;
