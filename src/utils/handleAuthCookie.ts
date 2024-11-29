import { OPTIONS } from '@/constants/token';
import { NextResponse } from 'next/server';

export const setAuthCookies = (
  response: NextResponse,
  name: string,
  value: string,
  expireTime: number,
) => {
  const expires = new Date(Date.now() + expireTime);

  response.cookies.set({
    name,
    value,
    expires,
    ...OPTIONS,
  });
};
