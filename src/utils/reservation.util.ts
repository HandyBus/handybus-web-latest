import { ReservationsViewEntity } from '@/types/reservation.type';
import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';
import dayjs from 'dayjs';

export const getBoardingTime = ({
  tripType,
  toDestinationShuttleRouteHubs,
  fromDestinationShuttleRouteHubs,
  toDestinationShuttleRouteHubId,
}: {
  tripType: TripType;
  toDestinationShuttleRouteHubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  fromDestinationShuttleRouteHubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  toDestinationShuttleRouteHubId: string;
}) => {
  const sortedToDestinationShuttleRouteHubs =
    toDestinationShuttleRouteHubs?.toSorted((a, b) => a.sequence - b.sequence);
  const sortedFromDestinationShuttleRouteHubs =
    fromDestinationShuttleRouteHubs?.toSorted(
      (a, b) => a.sequence - b.sequence,
    );
  const boardingHubs =
    tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION'
      ? {
          hubs: sortedToDestinationShuttleRouteHubs,
          hubId: toDestinationShuttleRouteHubId,
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

  return dayjs(boardingTime).tz('Asia/Seoul');
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
