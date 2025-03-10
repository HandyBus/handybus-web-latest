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

// 예약 완료
export const IS_RESERVATION_COMPLETED = 'is-reservation-completed';
export const setReservationCompleted = () => {
  localStorage.setItem(IS_RESERVATION_COMPLETED, '1');
};
export const getReservationCompleted = () => {
  return Boolean(localStorage.getItem(IS_RESERVATION_COMPLETED));
};
export const removeReservationCompleted = () => {
  localStorage.removeItem(IS_RESERVATION_COMPLETED);
};

// 첫 가입
export const IS_FIRST_SIGNUP = 'is-first-signup';
export const setFirstSignup = () => {
  localStorage.setItem(IS_FIRST_SIGNUP, '1');
};
export const getFirstSignup = () => {
  return Boolean(localStorage.getItem(IS_FIRST_SIGNUP));
};
export const removeFirstSignup = () => {
  localStorage.removeItem(IS_FIRST_SIGNUP);
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
