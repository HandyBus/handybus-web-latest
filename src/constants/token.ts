export const REFRESH_TOKEN = 'refresh-token';
export const ACCESS_TOKEN = 'access-token';
export const IS_ONBOARDING = 'is-onboarding';
export const IS_LOGGED_IN = 'is-logged-in';

// export const COOKIE_OPTIONS = {
//   secure: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
//   sameSite: 'strict',
//   path: '/',
// } as const;

export const COOKIE_OPTIONS = {
  secure: false, // 로컬 개발 환경에서 HTTPS가 아닌 경우
  sameSite: 'lax', // 외부 사이트에서의 요청을 허용하려면
  path: '/',
} as const;
