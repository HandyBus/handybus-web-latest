import { ReservationsViewEntity } from '@/types/reservation.type';
import { checkIsHandyParty } from '@/utils/handyParty.util';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';

export type ReservationProgress =
  | 'beforeShuttle'
  | 'shuttleEnded'
  | 'reservationCanceled';

interface Props {
  reservation: ReservationsViewEntity;
  dailyEventDate: Dayjs;
}

const useReservationProgress = ({ reservation, dailyEventDate }: Props) => {
  const reservationProgress: ReservationProgress = useMemo(() => {
    const isShuttleEnded = reservation.shuttleRoute.status === 'ENDED';
    const isReservationCanceled = reservation.reservationStatus === 'CANCEL';

    if (isReservationCanceled) {
      return 'reservationCanceled';
    }
    if (isShuttleEnded) {
      return 'shuttleEnded';
    }
    return 'beforeShuttle';
  }, [reservation]);

  const isHandyParty = checkIsHandyParty(reservation.shuttleRoute);

  // 왕복 혹은 행사장행 일때 행사장 하차지 시간을 기준으로 1시간 전부터 리뷰 작성 가능
  const tripType = reservation.type;

  const selectedFromDestinationShuttleRouteHubId =
    reservation.fromDestinationShuttleRouteHubId;

  const arrivalTime =
    tripType === 'TO_DESTINATION' || tripType === 'ROUND_TRIP'
      ? reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        )?.arrivalTime
      : reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
          (hub) =>
            hub.shuttleRouteHubId === selectedFromDestinationShuttleRouteHubId,
        )?.arrivalTime;

  const reviewOpenTime = dayjs(arrivalTime)
    .tz('Asia/Seoul')
    .subtract(1, 'hour');
  const reviewClosingTime = dayjs(dailyEventDate)
    .tz('Asia/Seoul')
    .add(7, 'day');
  const now = dayjs().tz('Asia/Seoul');

  const isWritingReviewPeriod =
    (reservation.shuttleRoute.status === 'CLOSED' ||
      reservation.shuttleRoute.status === 'ENDED') &&
    now.isAfter(reviewOpenTime) &&
    now.isBefore(reviewClosingTime);

  const reviewId = reservation.reviewId;

  return {
    reservationProgress,
    reviewId,
    isWritingReviewPeriod,
    isHandyParty,
  };
};

export default useReservationProgress;
