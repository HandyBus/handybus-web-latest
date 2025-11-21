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

// 이벤트 프로모션 하루 동안 안보기 모달
export const EVENT_PROMOTION_MODAL_SEEN_DATE =
  'event-promotion-modal-seen-date';
export const setEventPromotionModalSeenDate = (date: string) => {
  localStorage.setItem(EVENT_PROMOTION_MODAL_SEEN_DATE, date);
};
export const getEventPromotionModalSeenDate = () => {
  return localStorage.getItem(EVENT_PROMOTION_MODAL_SEEN_DATE);
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

// 푸시 토큰
export const PUSH_TOKEN = 'push-token';
export const setPushToken = (token: string) => {
  localStorage.setItem(PUSH_TOKEN, token);
};
export const getPushToken = () => {
  return localStorage.getItem(PUSH_TOKEN);
};
export const removePushToken = () => {
  localStorage.removeItem(PUSH_TOKEN);
};
