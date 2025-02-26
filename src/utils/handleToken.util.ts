'use client';

import revalidateUserPath from '@/app/actions/revalidateUserPath.action';

// ACCESS TOKEN
export const ACCESS_TOKEN = 'access-token';

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
export const REFRESH_TOKEN = 'refresh-token';

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

// 온보딩 상태
export const ONBOARDING_STATUS = 'onboarding-status';
export const ONBOARDING_STATUS_VALUES = {
  INCOMPLETE: 'b6e607dfb51b1',
  COMPLETE: '688223f6adad3',
};

export const getOnboardingStatus = () => {
  return localStorage.getItem(ONBOARDING_STATUS);
};
export const setOnboardingStatusComplete = () => {
  localStorage.setItem(ONBOARDING_STATUS, ONBOARDING_STATUS_VALUES.COMPLETE);
};
export const setOnboardingStatusIncomplete = () => {
  localStorage.setItem(ONBOARDING_STATUS, ONBOARDING_STATUS_VALUES.INCOMPLETE);
};
export const removeOnboardingStatus = () => {
  localStorage.removeItem(ONBOARDING_STATUS);
};

// 로그인 여부
export const getIsLoggedIn = () => {
  const hasRefreshToken = Boolean(getRefreshToken());
  const onboardingStatus = getOnboardingStatus();
  const isLoggedIn =
    hasRefreshToken && onboardingStatus === ONBOARDING_STATUS_VALUES.COMPLETE;
  return isLoggedIn;
};

// 로그아웃 (모든 토큰 삭제 및 홈으로 이동)
export const logout = async () => {
  removeOnboardingStatus();
  removeAccessToken();
  removeRefreshToken();
  await revalidateUserPath();
};
