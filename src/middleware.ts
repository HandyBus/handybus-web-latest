import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from './services/config';
import { postRefreshToken } from './services/auth';
import { AxiosError } from 'axios';

const REFRESH_TOKEN = 'refresh-token';
const ACCESS_TOKEN = 'access-token';

export const middleware = async (req: NextRequest) => {
  const url = BASE_URL + req.nextUrl.href.split('/api/')[1];
  req.nextUrl.href = url;
  const response = NextResponse.redirect(req.nextUrl);

  let accessToken = req.cookies.get(ACCESS_TOKEN)?.value ?? '';

  if (!accessToken) {
    try {
      const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;
      if (!refreshToken) {
        return redirectToLogin(req.url);
      }
      const newTokens = await postRefreshToken(refreshToken);
      accessToken = newTokens.accessToken;
      response.cookies.set(REFRESH_TOKEN, newTokens.refreshToken);
    } catch (e) {
      const error = e as AxiosError;
      if (error.status === 401) {
        return redirectToLogin(req.url);
      }
      console.error(error);
    }
  }

  response.headers.set('Authorization', `Bearer ${accessToken}`);
  response.cookies.set(ACCESS_TOKEN, accessToken);

  return response;
};

export const config = {
  matcher: ['/api/:path*'],
};

const redirectToLogin = (url: string) => {
  return NextResponse.rewrite(new URL('/login', url));
};
