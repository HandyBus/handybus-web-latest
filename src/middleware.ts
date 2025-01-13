import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import {
  ACCESS_TOKEN,
  ONBOARDING_TOKEN,
  OPTIONS,
  REFRESH_TOKEN,
} from './constants/token';
import { cookies } from 'next/headers';
import { postUpdateToken } from './services/v2-temp/auth.service';

// 로그인이 필요한 페이지들만 미들웨어 처리
export const middleware = async (req: NextRequest) => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
  const onboardingToken = cookieStore.get(ONBOARDING_TOKEN)?.value;

  // 토큰 만료 시 토큰 재발급
  if (refreshToken && !accessToken) {
    return handleRefreshToken(req);
  }

  // 로그인 여부에 따라 리다이렉트
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 온보딩 토큰이 있는 경우 온보딩 페이지로 리다이렉트
  if (req.nextUrl.pathname !== '/onboarding' && onboardingToken) {
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

const handleRefreshToken = async (req: NextRequest) => {
  try {
    const response = NextResponse.redirect(new URL(req.url));
    const tokens = await postUpdateToken();
    response.cookies.set(ACCESS_TOKEN, tokens.accessToken, {
      ...OPTIONS,
      expires: new Date(tokens.accessTokenExpiresAt),
    });
    response.cookies.set(REFRESH_TOKEN, tokens.refreshToken, {
      ...OPTIONS,
      expires: new Date(tokens.refreshTokenExpiresAt),
    });
    return response;
  } catch (error) {
    console.error('미들웨어 로그인 시간 만료: ', error);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete(ACCESS_TOKEN);
    response.cookies.delete(REFRESH_TOKEN);
    return response;
  }
};
