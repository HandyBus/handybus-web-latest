import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_EXPIRE_TIME,
  ACCESS_TOKEN,
  REFRESH_EXPIRE_TIME,
  REFRESH_TOKEN,
} from './constants/token';
import { getProgress } from './services/users';
import { postRefreshToken } from './services/auth';
import { setAuthCookies } from './utils/handleAuthCookie';

export const middleware = async (req: NextRequest) => {
  // 인증 필요 페이지에 접근할 때 토큰 존재와 온보딩 완료 여부에 따라 리다이렉트
  if (AuthRequiredPages.includes(req.nextUrl.pathname)) {
    try {
      const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;
      const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
      if (!refreshToken) {
        return clearTokensAndRedirect(req, '/login');
      }
      if (!accessToken) {
        return handleTokenRefresh(req, refreshToken);
      }

      const progress = await getProgress();
      if (progress !== 'ONBOARDING_COMPLETE') {
        return NextResponse.rewrite(new URL('/onboarding', req.url));
      }
    } catch (e) {
      console.error('middleware error: ', e);
      return clearTokensAndRedirect(req, '/login');
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/api/:path*', '/mypage'],
};

export const AuthRequiredPages = ['/mypage'];

const handleTokenRefresh = async (req: NextRequest, refreshToken: string) => {
  const tokens = await postRefreshToken(refreshToken);
  const response = NextResponse.redirect(new URL(req.url, req.url));

  setAuthCookies(
    response,
    REFRESH_TOKEN,
    tokens.refreshToken,
    REFRESH_EXPIRE_TIME,
  );
  setAuthCookies(
    response,
    ACCESS_TOKEN,
    tokens.accessToken,
    ACCESS_EXPIRE_TIME,
  );

  return response;
};

const clearTokensAndRedirect = (req: NextRequest, path: string) => {
  const response = NextResponse.rewrite(new URL(path, req.url));
  response.cookies.delete(REFRESH_TOKEN);
  response.cookies.delete(ACCESS_TOKEN);
  return response;
};
