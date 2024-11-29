import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/token';
import { getProgress } from './services/users';
import { postRefreshToken } from './services/auth';
import { setAuthCookies } from './utils/handleAuthCookie';

export const middleware = async (req: NextRequest) => {
  // 로그인 상태에서 온보딩 접근 시 마이페이지로 리다이렉트
  if (req.nextUrl.pathname === '/onboarding') {
    const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;
    if (refreshToken) {
      return NextResponse.redirect(new URL('/mypage', req.url));
    }
  }

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
      console.error('Middleware Error: ', e);
      return clearTokensAndRedirect(req, '/login');
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/api/:path*', '/onboarding', '/mypage'],
};

export const AuthRequiredPages = ['/mypage'];

const handleTokenRefresh = async (req: NextRequest, refreshToken: string) => {
  const tokens = await postRefreshToken(refreshToken);
  const response = NextResponse.redirect(new URL(req.url, req.url));

  setAuthCookies(
    response,
    REFRESH_TOKEN,
    tokens.refreshToken,
    new Date(tokens.refreshTokenExpiresAt),
  );
  setAuthCookies(
    response,
    ACCESS_TOKEN,
    tokens.accessToken,
    new Date(tokens.accessTokenExpiresAt),
  );

  return response;
};

const clearTokensAndRedirect = (req: NextRequest, path: string) => {
  const response = NextResponse.rewrite(new URL(path, req.url));
  response.cookies.delete(REFRESH_TOKEN);
  response.cookies.delete(ACCESS_TOKEN);
  return response;
};
