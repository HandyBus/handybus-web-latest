import { ReservationsViewEntity } from '@/types/reservation.type';
import dayjs, { Dayjs } from 'dayjs';
import { checkIsHandyParty } from './handyParty.util';

export const getBoardingTime = (
  reservation: ReservationsViewEntity,
): Dayjs | null => {
  const shuttleRoute = reservation.shuttleRoute;
  const dailyEvent = shuttleRoute.event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === shuttleRoute.dailyEventId,
  );
  if (!dailyEvent) {
    return null;
  }

  // 핸디팟의 경우 행사장행 탑승 시간 별도로 지정 X
  const isHandyParty = checkIsHandyParty(shuttleRoute);
  if (isHandyParty) {
    if (
      reservation.type === 'TO_DESTINATION' ||
      reservation.type === 'ROUND_TRIP'
    ) {
      return dayjs(dailyEvent.date).tz('Asia/Seoul').startOf('day');
    } else {
      const fromDestinationDestinationHub =
        shuttleRoute.fromDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        );
      if (!fromDestinationDestinationHub) {
        return null;
      }
      return dayjs(fromDestinationDestinationHub.arrivalTime).tz('Asia/Seoul');
    }
  }

  if (
    reservation.type === 'TO_DESTINATION' ||
    reservation.type === 'ROUND_TRIP'
  ) {
    const toDestinationHub = shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) =>
        hub.shuttleRouteHubId === reservation.toDestinationShuttleRouteHubId,
    );
    if (!toDestinationHub) {
      return null;
    }
    return dayjs(toDestinationHub.arrivalTime).tz('Asia/Seoul');
  } else {
    const fromDestinationDestinationHub =
      shuttleRoute.fromDestinationShuttleRouteHubs?.find(
        (hub) => hub.role === 'DESTINATION',
      );
    if (!fromDestinationDestinationHub) {
      return null;
    }
    return dayjs(fromDestinationDestinationHub.arrivalTime).tz('Asia/Seoul');
  }
};

export const calculateRefundFee = (
  reservation: ReservationsViewEntity | null,
) => {
  if (!reservation) {
    return null;
  }
  // 1시간 이내 전액 환불
  const nowTime = dayjs().tz();
  const paymentTime = dayjs(reservation.paymentCreatedAt).tz();

  if (nowTime.diff(paymentTime, 'hours') <= 1) {
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

export const getIsRefundable = (reservation: ReservationsViewEntity | null) => {
  if (!reservation) {
    return false;
  }
  // 1시간 이내 전액 환불
  const nowTime = dayjs().tz();
  const paymentTime = dayjs(reservation.paymentCreatedAt).tz();

  if (nowTime.diff(paymentTime, 'hours') <= 1) {
    return true;
  }

  // 탑승 5일 전 취소 시, 수수료 100% 발생 (즉 환불 X)
  const boardingTime = getBoardingTime(reservation);
  if (!boardingTime) {
    return false;
  }
  const boardingDate = boardingTime.startOf('day');
  const nowDate = dayjs().tz().startOf('day');

  const dDay = boardingDate.diff(nowDate, 'day');

  if (dDay >= 6) {
    return true;
  }

  return false;
};
