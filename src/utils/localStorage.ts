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
