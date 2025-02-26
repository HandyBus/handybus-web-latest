'use client';

import revalidateUserPath from '@/app/actions/revalidateUserPath.action';
import { ACCESS_TOKEN, IS_ONBOARDING, REFRESH_TOKEN } from '@/constants/token';

// ACCESS TOKEN
export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return accessToken;
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

// REFRESH TOKEN
export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  return refreshToken;
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

// IS ONBOARDING
export const getIsOnboarding = () => {
  const isOnboarding = Boolean(localStorage.getItem(IS_ONBOARDING));
  return isOnboarding;
};

export const setIsOnboarding = () => {
  localStorage.setItem(IS_ONBOARDING, '1');
};

export const removeIsOnboarding = () => {
  localStorage.removeItem(IS_ONBOARDING);
};

// 로그인 여부
export const getIsLoggedIn = () => {
  const hasRefreshToken = Boolean(getRefreshToken());
  const isOnboarding = getIsOnboarding();
  const isLoggedIn = hasRefreshToken && !isOnboarding;
  return isLoggedIn;
};

// 로그아웃 (모든 토큰 삭제 및 홈으로 이동)
export const logout = async () => {
  removeIsOnboarding();
  removeAccessToken();
  removeRefreshToken();
  await revalidateUserPath();
};
