import { ACCESS_TOKEN } from '@/constants/token';
import { REFRESH_TOKEN } from '@/constants/token';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL(req.nextUrl.origin));
  response.cookies.delete(ACCESS_TOKEN);
  response.cookies.delete(REFRESH_TOKEN);
  return response;
}
