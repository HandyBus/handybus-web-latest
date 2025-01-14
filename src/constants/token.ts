export const REFRESH_TOKEN = 'refresh-token';
export const ACCESS_TOKEN = 'access-token';
export const ONBOARDING_TOKEN = 'onboarding-token';
export const OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
} as const;
