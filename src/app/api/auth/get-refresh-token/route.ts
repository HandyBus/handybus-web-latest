import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh-token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ refreshToken: null }, { status: 404 });
  }

  return NextResponse.json({ refreshToken });
}
