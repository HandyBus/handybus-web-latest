import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from './services/config';
import { postRefreshToken } from './services/auth';
import { AxiosError } from 'axios';

const REFRESH_TOKEN = 'refresh-token';
const ACCESS_TOKEN = 'access-token';

const AuthRequiredPages = ['/mypage'];

export const middleware = async (req: NextRequest) => {
  let accessToken = req.cookies.get(ACCESS_TOKEN)?.value ?? '';

  // 인증이 필요한 페이지인 경우
  if (AuthRequiredPages.includes(req.nextUrl.pathname)) {
    if (!accessToken) {
      return redirectToLogin(req.url);
    } else {
      return NextResponse.next();
    }
  }

  // API 요청인 경우
  const url = BASE_URL + req.nextUrl.href.split('/api/')[1];
  req.nextUrl.href = url;
  const response = NextResponse.rewrite(req.nextUrl);

  if (!accessToken) {
    try {
      const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;
      if (!refreshToken) {
        return redirectToLogin(req.url);
      }
      const newTokens = await postRefreshToken(refreshToken);
      accessToken = newTokens.accessToken;
      response.cookies.set(REFRESH_TOKEN, newTokens.refreshToken);
      response.cookies.set(ACCESS_TOKEN, newTokens.refreshToken);
    } catch (e) {
      const error = e as AxiosError;
      if (error.status === 401) {
        return redirectToLogin(req.url);
      }
    }
  }

  response.headers.set('Authorization', `Bearer ${accessToken}`);
  return response;
};

export const config = {
  matcher: ['/api/:path*', '/mypage'],
};

const redirectToLogin = (url: string) => {
  return NextResponse.rewrite(new URL('/login', url));
};
