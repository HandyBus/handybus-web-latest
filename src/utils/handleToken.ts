'use server';

import {
  ACCESS_TOKEN,
  ONBOARDING_TOKEN,
  OPTIONS,
  REFRESH_TOKEN,
} from '@/constants/token';
import { TokenType } from '@/services/auth';
import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  return accessToken;
};

export const getRefreshToken = async () => {
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  return refreshToken;
};

export const setAccessToken = async (
  accessToken: string,
  expiresAt: string,
) => {
  cookies().set(ACCESS_TOKEN, accessToken, {
    ...OPTIONS,
    expires: new Date(expiresAt),
  });
};

export const setRefreshToken = async (
  refreshToken: string,
  expiresAt: string,
) => {
  cookies().set(REFRESH_TOKEN, refreshToken, {
    ...OPTIONS,
    expires: new Date(expiresAt),
  });
};

export const removeAccessToken = async () => {
  cookies().delete(ACCESS_TOKEN);
};

export const removeRefreshToken = async () => {
  cookies().delete(REFRESH_TOKEN);
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const updateToken = async () => {
  const refreshToken = await getRefreshToken();
  const res = await fetch(new URL('/auth/refresh', BASE_URL), {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error('토큰 재발급 실패');
  }

  return data as TokenType;
};

export const setOnboardingToken = async () => {
  cookies().set(ONBOARDING_TOKEN, 'true', OPTIONS);
};

export const removeOnboardingToken = async () => {
  cookies().delete(ONBOARDING_TOKEN);
};
