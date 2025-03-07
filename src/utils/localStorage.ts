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
