'use client';

import { putUserPushToken } from '@/services/user.service';
import { logout, logoutWithLoginRedirect } from '@/utils/handleToken.util';

/** 로그아웃 (푸시토큰 정리 + Amplitude 초기화 + 토큰 삭제 + 홈 이동) */
export const logoutWithCleanup = async () => {
  await putUserPushToken(null);
  await logout();
};

/** 로그아웃 (푸시토큰 정리 + Amplitude 초기화 + 토큰 삭제 + 로그인 페이지 이동) */
export const logoutWithCleanupAndLoginRedirect = async (
  redirectUrl?: string,
) => {
  await putUserPushToken(null);
  await logoutWithLoginRedirect(redirectUrl);
};
