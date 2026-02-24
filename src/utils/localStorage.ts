import dayjs from 'dayjs';
import { BIG_REGIONS, BigRegionsType } from '@/constants/regions';

// 로그인 시 리다이렉트 될 주소
export const REDIRECT_URL = 'redirect-url';
export const setRedirectUrl = (url: string) => {
  localStorage.setItem(REDIRECT_URL, encodeURIComponent(url));
};
export const getRedirectUrl = () => {
  const redirectUrl = localStorage.getItem(REDIRECT_URL);
  return redirectUrl ? decodeURIComponent(redirectUrl) : null;
};
export const removeRedirectUrl = () => {
  localStorage.removeItem(REDIRECT_URL);
};

// entry greeting (첫 가입)
export const IS_ENTRY_GREETING_INCOMPLETE = 'is-entry-greeting-incomplete';
export const setEntryGreetingIncomplete = () => {
  localStorage.setItem(IS_ENTRY_GREETING_INCOMPLETE, '1');
};
export const getEntryGreetingIncomplete = () => {
  return Boolean(localStorage.getItem(IS_ENTRY_GREETING_INCOMPLETE));
};
export const removeEntryGreetingIncomplete = () => {
  localStorage.removeItem(IS_ENTRY_GREETING_INCOMPLETE);
};

// 최근 로그인
export const LAST_LOGIN = 'last-login';
export const setLastLogin = (type: 'kakao' | 'naver' | 'apple') => {
  localStorage.setItem(LAST_LOGIN, type);
};
export const getLastLogin = () => {
  return localStorage.getItem(LAST_LOGIN) as 'kakao' | 'naver' | 'apple' | null;
};
export const removeLastLogin = () => {
  localStorage.removeItem(LAST_LOGIN);
};

// 최근에 본 지역
export const RECENTLY_VIEWED_BIG_REGION = 'recently-viewed-big-region';
export const setRecentlyViewedBigRegion = (bigRegion: BigRegionsType) => {
  localStorage.setItem(RECENTLY_VIEWED_BIG_REGION, bigRegion);
};
export const getRecentlyViewedBigRegion = (): BigRegionsType | null => {
  const recentlyViewedBigRegion = localStorage.getItem(
    RECENTLY_VIEWED_BIG_REGION,
  );
  const isBigRegion = BIG_REGIONS.includes(
    recentlyViewedBigRegion as BigRegionsType,
  );
  if (!isBigRegion) {
    return null;
  }
  return recentlyViewedBigRegion as BigRegionsType;
};
export const removeRecentlyViewedBigRegion = () => {
  localStorage.removeItem(RECENTLY_VIEWED_BIG_REGION);
};

// 최근에 본 정류장
/* @deprecated */
export const RECENTLY_VIEWED_HUB_ID = 'recently-viewed-hub-id';
export const setRecentlyViewedHubId = (hubId: string) => {
  localStorage.setItem(RECENTLY_VIEWED_HUB_ID, hubId);
};
export const getRecentlyViewedHubId = () => {
  return localStorage.getItem(RECENTLY_VIEWED_HUB_ID);
};
export const removeRecentlyViewedHubId = () => {
  localStorage.removeItem(RECENTLY_VIEWED_HUB_ID);
};

// 하루 동안 안보기 모달
export const ONE_DAY_MODAL_SEEN_DATE = 'one-day-modal-seen-date';
export const setOneDayModalSeenDate = (date: string) => {
  localStorage.setItem(ONE_DAY_MODAL_SEEN_DATE, date);
};
export const getOneDayModalSeenDate = () => {
  return localStorage.getItem(ONE_DAY_MODAL_SEEN_DATE);
};
export const removeOneDayModalSeenDate = () => {
  localStorage.removeItem(ONE_DAY_MODAL_SEEN_DATE);
};

// 예약 직후 예약 상세 페이지 첫 방문 모달
export const RESERVATION_DETAIL_FIRST_VISIT_MODAL_SEEN =
  'reservation-detail-first-visit-modal-seen';
export const setReservationDetailFirstVisitModalSeen = (
  reservationId: string,
) => {
  localStorage.setItem(
    `${RESERVATION_DETAIL_FIRST_VISIT_MODAL_SEEN}-${reservationId}`,
    '1',
  );
};
export const getReservationDetailFirstVisitModalSeen = (
  reservationId: string,
) => {
  return Boolean(
    localStorage.getItem(
      `${RESERVATION_DETAIL_FIRST_VISIT_MODAL_SEEN}-${reservationId}`,
    ),
  );
};
export const removeReservationDetailFirstVisitModalSeen = (
  reservationId: string,
) => {
  localStorage.removeItem(
    `${RESERVATION_DETAIL_FIRST_VISIT_MODAL_SEEN}-${reservationId}`,
  );
};

// 앱 출시 기념 이벤트의 앱 진입 시 띄워지는 모달
export const APP_LAUNCH_EVENT_COUPON_DOWNLOAD_MODAL_SEEN =
  'app-launch-event-coupon-download-modal-seen';
export const setAppLaunchEventCouponDownloadModalSeen = () => {
  localStorage.setItem(APP_LAUNCH_EVENT_COUPON_DOWNLOAD_MODAL_SEEN, '1');
};
export const getAppLaunchEventCouponDownloadModalSeen = () => {
  return Boolean(
    localStorage.getItem(APP_LAUNCH_EVENT_COUPON_DOWNLOAD_MODAL_SEEN),
  );
};
export const removeAppLaunchEventCouponDownloadModalSeen = () => {
  localStorage.removeItem(APP_LAUNCH_EVENT_COUPON_DOWNLOAD_MODAL_SEEN);
};

// 백엔드 서버와 푸시토큰 동기화 실패 시 재시도를 위한 대기 토큰
export const PENDING_PUSH_TOKEN = 'pending-push-token';

interface PendingPushToken {
  token: string | null;
}

export const setPendingPushToken = (token: string | null) => {
  const data: PendingPushToken = { token };
  localStorage.setItem(PENDING_PUSH_TOKEN, JSON.stringify(data));
};

export const getPendingPushToken = (): PendingPushToken | null => {
  const data = localStorage.getItem(PENDING_PUSH_TOKEN);
  if (!data) return null;
  try {
    return JSON.parse(data) as PendingPushToken;
  } catch {
    return null;
  }
};

export const removePendingPushToken = () => {
  localStorage.removeItem(PENDING_PUSH_TOKEN);
};

// 포도알 게임 비로그인 플레이 횟수 (총 누적, 날짜 기준 없음)
export const GRAPE_GAME_PLAY_COUNT = 'grape-game-play-count';

export const getGrapeGamePlayCount = (): number => {
  const data = localStorage.getItem(GRAPE_GAME_PLAY_COUNT);
  if (!data) return 0;
  const parsed = Number(data);
  if (!Number.isInteger(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
};

export const incrementGrapeGamePlayCount = () => {
  const currentCount = getGrapeGamePlayCount();
  localStorage.setItem(GRAPE_GAME_PLAY_COUNT, String(currentCount + 1));
};

// 포도알 게임 게스트 식별 키 (UUID, 영구 보관)
export const GRAPE_GAME_GUEST_KEY = 'grape-game-guest-key';

export const getGrapeGameGuestKey = (): string | null => {
  return localStorage.getItem(GRAPE_GAME_GUEST_KEY);
};

export const getOrCreateGrapeGameGuestKey = (): string => {
  const existing = localStorage.getItem(GRAPE_GAME_GUEST_KEY);
  if (existing) return existing;
  const newKey =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${dayjs().valueOf()}-${Math.random().toString(36).slice(2, 11)}`;
  localStorage.setItem(GRAPE_GAME_GUEST_KEY, newKey);
  return newKey;
};

export const removeGrapeGameGuestKey = () => {
  localStorage.removeItem(GRAPE_GAME_GUEST_KEY);
};

// 포도알 게임에서 로그인으로 리다이렉트됨을 표시하는 플래그
export const CATCH_GRAPE_LOGIN_INTENT = 'catch-grape-login-intent';

export const setCatchGrapeLoginIntent = () => {
  localStorage.setItem(CATCH_GRAPE_LOGIN_INTENT, '1');
};

export const getCatchGrapeLoginIntent = (): boolean => {
  return Boolean(localStorage.getItem(CATCH_GRAPE_LOGIN_INTENT));
};

export const removeCatchGrapeLoginIntent = () => {
  localStorage.removeItem(CATCH_GRAPE_LOGIN_INTENT);
};
