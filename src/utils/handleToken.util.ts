'use client';

import revalidateUserPath from '@/app/actions/revalidateUserPath.action';
import {
  ACCESS_TOKEN,
  IS_LOGGED_IN,
  IS_ONBOARDING,
  COOKIE_OPTIONS,
  REFRESH_TOKEN,
} from '@/constants/token';
import { Cookies } from 'react-cookie';

const cookieStore = new Cookies(COOKIE_OPTIONS);

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
  const isOnboarding = Boolean(cookieStore.get(IS_ONBOARDING));
  return isOnboarding;
};

export const setIsOnboarding = () => {
  cookieStore.set(IS_ONBOARDING, '1', COOKIE_OPTIONS);
};

export const removeIsOnboarding = () => {
  cookieStore.remove(IS_ONBOARDING, COOKIE_OPTIONS);
};

// IS LOGGED IN
export const getIsLoggedIn = () => {
  const isLoggedIn = Boolean(cookieStore.get(IS_LOGGED_IN));
  return isLoggedIn;
};

export const setIsLoggedIn = () => {
  cookieStore.set(IS_LOGGED_IN, '1', COOKIE_OPTIONS);
};

export const removeIsLoggedIn = () => {
  cookieStore.remove(IS_LOGGED_IN, COOKIE_OPTIONS);
};

// 로그아웃 (모든 토큰 삭제 및 홈으로 이동)
export const logout = async () => {
  removeIsLoggedIn();
  removeIsOnboarding();
  removeAccessToken();
  removeRefreshToken();
  await revalidateUserPath();
};
