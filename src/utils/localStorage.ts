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
export const setLastLogin = (type: 'kakao' | 'naver') => {
  localStorage.setItem(LAST_LOGIN, type);
};
export const getLastLogin = () => {
  return localStorage.getItem(LAST_LOGIN) as 'kakao' | 'naver' | null;
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

// T1 경품 추천 모달 (하루 동안 안보기)
export const T1_GIFT_RECOMMENDATION_MODAL_SEEN_DATE =
  't1-gift-recommendation-modal-seen-date';
export const setT1GiftRecommendationModalSeenDate = (date: string) => {
  localStorage.setItem(T1_GIFT_RECOMMENDATION_MODAL_SEEN_DATE, date);
};
export const getT1GiftRecommendationModalSeenDate = () => {
  return localStorage.getItem(T1_GIFT_RECOMMENDATION_MODAL_SEEN_DATE);
};
export const removeT1GiftRecommendationModalSeenDate = () => {
  localStorage.removeItem(T1_GIFT_RECOMMENDATION_MODAL_SEEN_DATE);
};
