import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { checkIsHandyParty } from '@/utils/handyParty.util';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export type ReservationProgress =
  | 'beforeBusAssigned'
  | 'afterBusAssigned'
  | 'reviewAvailable'
  | 'shuttleEnded'
  | 'reservationCanceled';

interface Props {
  reservation: ReservationsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity | null | undefined;
}

const useReservationProgress = ({ reservation, dailyEvent }: Props) => {
  const reservationProgress: ReservationProgress = useMemo(() => {
    const isBusAssigned = !!reservation.shuttleBusId;
    const isShuttleEnded = reservation.shuttleRoute.status === 'ENDED';
    const isReservationCanceled = reservation.reservationStatus === 'CANCEL';

    // 왕복 혹은 가는 편 일때 행사장 하차지 시간을 기준으로 리뷰 작성 가능 여부 판단
    const tripType = reservation.type;
    const arrivalTime =
      tripType === 'TO_DESTINATION' || tripType === 'ROUND_TRIP'
        ? reservation.shuttleRoute.toDestinationShuttleRouteHubs?.[
            reservation.shuttleRoute.toDestinationShuttleRouteHubs.length - 1
          ]?.arrivalTime
        : reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.[
            reservation.shuttleRoute.fromDestinationShuttleRouteHubs.length - 1
          ]?.arrivalTime;
    const reviewOpenTime = dayjs(arrivalTime).subtract(1, 'hour');
    const isReviewAvailable =
      reservation.shuttleRoute.status === 'CLOSED' &&
      dayjs().isAfter(reviewOpenTime);

    if (isReservationCanceled) {
      return 'reservationCanceled';
    }
    if (isReviewAvailable) {
      return 'reviewAvailable';
    }
    if (isShuttleEnded) {
      return 'shuttleEnded';
    }
    if (isBusAssigned) {
      return 'afterBusAssigned';
    }
    return 'beforeBusAssigned';
  }, [reservation]);

  const handyStatus = reservation.handyStatus;

  const isHandyParty = checkIsHandyParty(reservation.shuttleRoute);

  const reviewId = reservation.reviewId;

  const isWritingReviewPeriod = !!(
    dailyEvent?.date &&
    dayjs()
      .tz('Asia/Seoul')
      .isBefore(dayjs(dailyEvent.date).tz('Asia/Seoul').add(7, 'day'))
  );

  return {
    reservationProgress,
    handyStatus,
    reviewId,
    isWritingReviewPeriod,
    isHandyParty,
  };
};

export default useReservationProgress;
