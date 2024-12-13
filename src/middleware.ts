import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_AT,
  TOKEN_KEYS,
} from './constants/token';
import { postRefreshToken } from './services/auth';
import { SESSION } from './utils/handleSession';
import { setResponseCookies } from './utils/handleCookie';
import { parseProgress } from './utils/parseProgress';
import { BASE_URL } from './services/config';

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
    const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;
    const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
    if (!refreshToken) {
      return clearTokensAndRedirect(req, '/login');
    }
    if (!accessToken) {
      return handleTokenRefresh(req, refreshToken);
    }
    try {
      const progress = await getProgress(accessToken);
      if (progress !== 'ONBOARDING_COMPLETE') {
        return NextResponse.rewrite(new URL('/onboarding', req.url));
      }
    } catch (e) {
      console.error('Middleware Progress Fetch Error: ', e);
      return clearTokensAndRedirect(req, '/login');
    }
  }

  // 로그아웃 시 토큰 삭제 (RSC 요청 시 토큰 삭제 방지)
  const response = NextResponse.next();
  const isRSC = req.nextUrl.searchParams.has('_rsc');
  if (!isRSC) {
    const session = req.cookies.get(SESSION)?.value;
    const parsedSession = session ? JSON.parse(session) : null;
    if (!parsedSession) {
      clearAllTokens(response);
    }
  }

  return response;
};

export const AuthRequiredPages = ['/mypage'];

export const config = {
  matcher: ['/api/:path*', '/', '/onboarding', '/mypage'],
};

const handleTokenRefresh = async (req: NextRequest, refreshToken: string) => {
  try {
    const tokens = await postRefreshToken(refreshToken);
    const response = NextResponse.redirect(new URL(req.url));

    setResponseCookies(
      response,
      REFRESH_TOKEN,
      tokens.refreshToken,
      new Date(tokens.refreshTokenExpiresAt),
    );
    setResponseCookies(
      response,
      ACCESS_TOKEN,
      tokens.accessToken,
      new Date(tokens.accessTokenExpiresAt),
    );
    setResponseCookies(
      response,
      REFRESH_TOKEN_EXPIRES_AT,
      tokens.refreshTokenExpiresAt,
      new Date(tokens.refreshTokenExpiresAt),
    );
    setResponseCookies(
      response,
      ACCESS_TOKEN_EXPIRES_AT,
      tokens.accessTokenExpiresAt,
      new Date(tokens.accessTokenExpiresAt),
    );

    return response;
  } catch (e) {
    console.error('Middleware Token Refresh Error: ', e);
    return clearTokensAndRedirect(req, '/login');
  }
};

const clearAllTokens = (response: NextResponse) => {
  TOKEN_KEYS.forEach((key) => response.cookies.delete(key));
};

const clearTokensAndRedirect = (req: NextRequest, path: string) => {
  const response = NextResponse.rewrite(new URL(path, req.url));
  clearAllTokens(response);
  return response;
};

const getProgress = async (accessToken: string) => {
  const res = await fetch(new URL('/user-management/users/me', BASE_URL), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  return parseProgress(data?.user?.progresses);
};
