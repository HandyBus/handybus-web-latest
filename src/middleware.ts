import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { IS_LOGGED_IN, IS_ONBOARDING } from './constants/token';
import { cookies } from 'next/headers';

// 로그인이 필요한 페이지들만 미들웨어 처리
export const middleware = async (req: NextRequest) => {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get(IS_LOGGED_IN)?.value;
  const isOnboarding = cookieStore.get(IS_ONBOARDING)?.value;

  // 온보딩 도중일 경우 로그인 페이지로 리다이렉트
  if (req.nextUrl.pathname !== '/onboarding' && isOnboarding) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 미로그인 상태일 때 로그인 페이지로 리다이렉트
  if (req.nextUrl.pathname !== '/onboarding' && !isLoggedIn) {
    const currentUrl = req.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${currentUrl}`, req.url),
    );
  }

  // 로그인 상태로 온보딩 페이지에 접근했을 때 마이페이지로 리다이렉트
  if (req.nextUrl.pathname === '/onboarding' && isLoggedIn) {
    return NextResponse.redirect(new URL('/mypage', req.url));
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
