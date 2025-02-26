export const COOKIE_OPTIONS = {
  secure: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
  sameSite: 'strict',
  path: '/',
} as const;
