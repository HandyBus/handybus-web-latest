import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/token';
import { getProgress } from './services/users';

export const AuthRequiredPages = ['/mypage'];

const clearTokensAndRedirect = (req: NextRequest, path: string) => {
  const response = NextResponse.rewrite(new URL(path, req.url));
  response.cookies.delete(REFRESH_TOKEN);
  response.cookies.delete(ACCESS_TOKEN);
  return response;
};

export const middleware = async (req: NextRequest) => {
  // 인증 필요 페이지에 접근할 때 토큰이 없으면 로그인 페이지로 리다이렉트
  if (AuthRequiredPages.includes(req.nextUrl.pathname)) {
    const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;

    if (!accessToken) {
      return clearTokensAndRedirect(req, '/login');
    }

    try {
      const progress = await getProgress(accessToken);
      if (progress !== 'ONBOARDING_COMPLETE') {
        return NextResponse.rewrite(new URL('/onboarding', req.url));
      }
    } catch (e) {
      console.error(e);
      return clearTokensAndRedirect(req, '/login');
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/api/:path*', '/mypage'],
};
