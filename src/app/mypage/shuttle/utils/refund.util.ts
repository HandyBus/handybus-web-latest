import { ReservationsViewEntity } from '@/types/user-management.type';
import dayjs from 'dayjs';

// 탑승 시간을 계산
export const getBoardingTime = (reservation: ReservationsViewEntity) => {
  const type = reservation.type;
  const sortedToDestinationShuttleRouteHubs =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.toSorted(
      (a, b) => a.sequence - b.sequence,
    );
  const sortedFromDestinationShuttleRouteHubs =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.toSorted(
      (a, b) => a.sequence - b.sequence,
    );
  const boardingHubs =
    type === 'ROUND_TRIP' || type === 'TO_DESTINATION'
      ? {
          hubs: sortedToDestinationShuttleRouteHubs,
          hubId: reservation.toDestinationShuttleRouteHubId,
        }
      : {
          hubs: sortedFromDestinationShuttleRouteHubs,
          hubId: sortedFromDestinationShuttleRouteHubs?.[0]?.shuttleRouteHubId,
        };

  const boardingTime = boardingHubs.hubs?.find(
    (hub) => hub.shuttleRouteHubId === boardingHubs.hubId,
  )?.arrivalTime;

  if (!boardingTime) {
    return null;
  }

  return dayjs(boardingTime).tz();
};

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
  const boardingTime = getBoardingTime(reservation);
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
