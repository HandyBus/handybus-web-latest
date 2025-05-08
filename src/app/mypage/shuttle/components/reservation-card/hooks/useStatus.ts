import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export type ReservationCardStatus =
  | 'beforeBusAssigned'
  | 'afterBusAssigned'
  | 'shuttleEnded'
  | 'reservationCanceled';

interface Props {
  reservation: ReservationsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity | null | undefined;
  shuttleBus: ShuttleBusesViewEntity | null | undefined;
}

const useStatus = ({ reservation, dailyEvent, shuttleBus }: Props) => {
  const reservationCardStatus: ReservationCardStatus = useMemo(() => {
    const isBusAssigned = !!reservation.shuttleBusId;
    const isShuttleEnded =
      reservation.shuttleRoute.status === 'ENDED' ||
      reservation.shuttleRoute.status === 'CANCELLED';
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

  const hasReview = reservation.hasReview;

  const isWritingReviewPeriod = !!(
    dailyEvent?.date &&
    dayjs()
      .tz('Asia/Seoul')
      .isBefore(dayjs(dailyEvent.date).tz('Asia/Seoul').add(7, 'day'))
  );

  return {
    reservationCardStatus,
    handyStatus,
    isOpenChatLinkCreated,
    hasReview,
    isWritingReviewPeriod,
  };
};

export default useStatus;
