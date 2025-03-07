import { ReservationsViewEntity } from '@/types/reservation.type';
import { getBoardingTime } from '@/utils/common.util';
import dayjs from 'dayjs';

// 취소 수수료를 계산
export const calculateRefundFee = (
  reservation: ReservationsViewEntity | null,
) => {
  if (!reservation) {
    return null;
  }
  // 24시간 이내 전액 환불
  const nowTime = dayjs().tz();
  const paymentTime = dayjs(reservation.paymentCreatedAt).tz();

  if (nowTime.diff(paymentTime, 'hours') <= 24) {
    return 0;
  }

  const paymentAmount = reservation.paymentAmount ?? 0;
  const boardingTime = getBoardingTime({
    tripType: reservation.type,
    toDestinationShuttleRouteHubs:
      reservation.shuttleRoute.toDestinationShuttleRouteHubs ?? [],
    fromDestinationShuttleRouteHubs:
      reservation.shuttleRoute.fromDestinationShuttleRouteHubs ?? [],
    toDestinationShuttleRouteHubId:
      reservation.toDestinationShuttleRouteHubId ?? '',
  });
  if (!boardingTime) {
    return null;
  }
  const boardingDate = boardingTime.startOf('day');
  const nowDate = dayjs().tz().startOf('day');

  const dDay = boardingDate.diff(nowDate, 'day');

  let refundFee = 0;

  if (dDay >= 8) {
    refundFee = 0;
  } else if (dDay === 7) {
    refundFee = paymentAmount * 0.25;
  } else if (dDay === 6) {
    refundFee = paymentAmount * 0.5;
  } else {
    refundFee = paymentAmount;
  }

  return Math.floor(refundFee);
};
