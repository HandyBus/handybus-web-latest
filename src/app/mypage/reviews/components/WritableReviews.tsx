'use client';

import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import ReservationCardForReview from './reservation-card/ReservationCardForReview';
import { useGetUserReservations } from '@/services/reservation.service';
import EmptyReview from './EmptyReview';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const WritableReviews = () => {
  const { data: reservations, isLoading } = useGetUserReservations({});

  const reservationsWithNotWrittenReview = useMemo(
    () =>
      reservations?.filter((reservation) => {
        if (reservation.reviewId) return false;
        if (
          reservation.reservationStatus !== 'COMPLETE_PAYMENT' ||
          reservation.shuttleRoute.status !== 'ENDED'
        )
          return false;
        const dailyEvent = reservation.shuttleRoute.event.dailyEvents.find(
          (dailyEvent) =>
            dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
        );
        const isBefore7Days =
          dailyEvent &&
          dayjs()
            .tz('Asia/Seoul')
            .isBefore(dayjs(dailyEvent.date).tz('Asia/Seoul').add(7, 'day'));
        return isBefore7Days;
      }),
    [reservations],
  );

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {reservationsWithNotWrittenReview &&
        (reservationsWithNotWrittenReview.length === 0 ? (
          <EmptyReview variant="writable-review" />
        ) : (
          <ul>
            {reservationsWithNotWrittenReview.map((reservation) => (
              <ReservationCardForReview
                key={reservation.reservationId}
                reservation={reservation}
              />
            ))}
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default WritableReviews;
