import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const session = req.cookies.get('session')?.value;
  if (!session) {
    return NextResponse.rewrite(new URL('/login', req.url));
  }
  return NextResponse.rewrite(new URL(req.url));
};

export const config = {
  matcher: '/mypage',
};
