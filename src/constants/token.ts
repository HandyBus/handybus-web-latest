export const REFRESH_TOKEN = 'refresh-token';
export const ACCESS_TOKEN = 'access-token';
export const IS_ONBOARDING = 'is-onboarding';
export const IS_LOGGED_IN = 'is-logged-in';

export const COOKIE_OPTIONS = {
  secure: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
  sameSite: 'strict',
  path: '/',
} as const;
