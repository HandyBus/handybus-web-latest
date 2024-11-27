import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/token';
import { SESSION, SessionType } from './utils/handleSession';

export const AuthRequiredPages = ['/mypage'];

export const middleware = async (req: NextRequest) => {
  const session = req.cookies.get(SESSION)?.value;
  const parsedSession = JSON.parse(session ?? '{}') as SessionType;

  // 인증 필요 페이지에 접근할 때 세션이 없으면 로그인 페이지로 리다이렉트
  if (
    AuthRequiredPages.includes(req.nextUrl.pathname) &&
    !parsedSession.isLoggedIn
  ) {
    const response = NextResponse.rewrite(new URL('/login', req.url));
    response.cookies.delete(REFRESH_TOKEN);
    response.cookies.delete(ACCESS_TOKEN);
    return response;
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/api/:path*', '/mypage'],
};
