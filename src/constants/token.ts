export const REFRESH_TOKEN = 'refresh-token';
export const ACCESS_TOKEN = 'access-token';

export const REFRESH_TOKEN_EXPIRES_AT = 'refresh-token-expires-at';
export const ACCESS_TOKEN_EXPIRES_AT = 'access-token-expires-at';

export const TOKEN_KEYS = [
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN_EXPIRES_AT,
] as const;

export const OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'production',
  sameSite: 'lax',
  path: '/',
} as const;
