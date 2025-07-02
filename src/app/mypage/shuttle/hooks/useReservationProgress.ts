import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import { getIsTaxiRoute } from '@/utils/taxiRoute.util';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export type ReservationProgress =
  | 'beforeBusAssigned'
  | 'afterBusAssigned'
  | 'shuttleEnded'
  | 'reservationCanceled';

interface Props {
  reservation: ReservationsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity | null | undefined;
  shuttleBus: ShuttleBusesViewEntity | null | undefined;
}

const useReservationProgress = ({
  reservation,
  dailyEvent,
  shuttleBus,
}: Props) => {
  const reservationProgress: ReservationProgress = useMemo(() => {
    const isBusAssigned = !!reservation.shuttleBusId;
    const isShuttleEnded = reservation.shuttleRoute.status === 'ENDED';
    const isReservationCanceled = reservation.reservationStatus === 'CANCEL';

    if (isReservationCanceled) {
      return 'reservationCanceled';
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

  const isOpenChatLinkCreated = !!shuttleBus?.openChatLink;

  const isTaxiRoute = getIsTaxiRoute(reservation.shuttleRoute);

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
    isOpenChatLinkCreated,
    reviewId,
    isWritingReviewPeriod,
    isTaxiRoute,
  };
};

export default useReservationProgress;
