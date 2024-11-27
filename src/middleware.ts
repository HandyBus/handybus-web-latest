import { NextRequest, NextResponse } from 'next/server';
import { REFRESH_TOKEN } from './utils/handleToken';

export const AuthRequiredPages = ['/mypage'];

export const middleware = async (req: NextRequest) => {
  const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value ?? '';

  if (AuthRequiredPages.includes(req.nextUrl.pathname) && !refreshToken) {
    return NextResponse.rewrite(new URL('/login', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/api/:path*', '/mypage'],
};
