import { ReservationsViewEntity } from '@/types/reservation.type';
import dayjs from 'dayjs';

// 선물하기는 탑승일 기준 6일 전까지 가능
export const checkIsReservationTransferablePeriod = (
  reservation: ReservationsViewEntity,
) => {
  const RESERVATION_TRANSFERABLE_PERIOD_DAYS = 6;

  const shuttleRoute = reservation.shuttleRoute;
  const dailyEvent = shuttleRoute.event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === shuttleRoute.dailyEventId,
  );
  if (!dailyEvent) {
    return false;
  }

  const today = dayjs().tz('Asia/Seoul').startOf('day');
  const boardingDay = dayjs(dailyEvent.date).tz('Asia/Seoul').startOf('day');

  const isTransferable =
    boardingDay.diff(today, 'day') >= RESERVATION_TRANSFERABLE_PERIOD_DAYS &&
    today.isBefore(boardingDay);

  return isTransferable;
};
