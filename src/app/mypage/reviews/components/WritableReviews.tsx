'use client';

import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import ReservationCardForReview from './reservation-card/ReservationCardForReview';
import { useGetUserReservations } from '@/services/reservation.service';
import EmptyReview from './EmptyReview';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const WritableReviews = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'PAST',
  });

  const reservationsWithNotWrittenReview = useMemo(
    () =>
      reservations?.filter((reservation) => {
        if (reservation.reviewId) return false;
        const dailyEvent = reservation.shuttleRoute.event.dailyEvents.find(
          (dailyEvent) =>
            dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
        );
        return (
          dailyEvent &&
          dayjs()
            .tz('Asia/Seoul')
            .isBefore(dayjs(dailyEvent.date).tz('Asia/Seoul').add(7, 'day'))
        );
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
