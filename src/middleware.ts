import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { IS_LOGGED_IN, IS_ONBOARDING } from './constants/token';
import { cookies } from 'next/headers';

// 로그인이 필요한 페이지들만 미들웨어 처리
export const middleware = async (req: NextRequest) => {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get(IS_LOGGED_IN)?.value;
  const isOnboarding = cookieStore.get(IS_ONBOARDING)?.value;

  // 로그인 여부에 따라 리다이렉트
  if (!isLoggedIn) {
    const currentUrl = req.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${currentUrl}`, req.url),
    );
  }

  // 온보딩이 필요한 경우 온보딩 페이지로 리다이렉트
  if (req.nextUrl.pathname !== '/onboarding' && isOnboarding) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/onboarding',
    '/mypage/:path*',
    '/demand/:path*/write',
    '/reservation/:path*/write',
  ],
};
