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

    // 왕복 혹은 행사장행 일때 행사장 하차지 시간을 기준으로 리뷰 작성 가능 여부 판단
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
              hub.shuttleRouteHubId ===
              selectedFromDestinationShuttleRouteHubId,
          )?.arrivalTime;
    const reviewOpenTime = dayjs(arrivalTime).subtract(1, 'hour');
    const isReviewAvailable =
      reservation.shuttleRoute.status === 'CLOSED' &&
      dayjs().isAfter(reviewOpenTime);
    // 여기서는 isShuttleEnded 상태로 넘어가야하기 때문에 다른 WritableReviews, WrittenReivews, 리뷰작성페이지 등의 컴포넌트 로직처럼 || reservation.shuttleRoute.status === 'ENDED' 조건을 추가하지 않음

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
