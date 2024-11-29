import { OPTIONS } from '@/constants/token';
import { NextResponse } from 'next/server';

export const setAuthCookies = (
  response: NextResponse,
  name: string,
  value: string,
  expires: Date,
) => {
  response.cookies.set({
    name,
    value,
    expires,
    ...OPTIONS,
  });
};
