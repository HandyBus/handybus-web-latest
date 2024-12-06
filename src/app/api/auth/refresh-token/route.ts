import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token } = await request.json();

  cookies().set('refresh-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  cookies().delete('refresh-token');
  return NextResponse.json({ success: true });
}
