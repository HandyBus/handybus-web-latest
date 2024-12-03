'use server';

import { OPTIONS } from '@/constants/token';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const setCookieOptions = (name: string, value: string, expires: Date) => ({
  name,
  value,
  expires,
  ...OPTIONS,
});

export const setResponseCookies = (
  response: NextResponse,
  name: string,
  value: string,
  expires: Date,
) => {
  response.cookies.set(setCookieOptions(name, value, expires));
};

export const setCookie = async (name: string, value: string, expires: Date) => {
  const cookieStore = cookies();
  cookieStore.set(setCookieOptions(name, value, expires));
};
