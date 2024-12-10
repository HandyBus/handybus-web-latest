import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token } = await request.json();

  // 쿠키 설정
  cookies().set('refresh-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh-token')?.value;

  return NextResponse.json({ refreshToken });
}
export async function DELETE() {
  cookies().delete('refresh-token');
  return NextResponse.json({ success: true });
}
