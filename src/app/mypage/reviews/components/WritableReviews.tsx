'use client';

import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import ReservationCardForReview from './reservation-card/ReservationCardForReview';
import { useGetUserReservations } from '@/services/reservation.service';
import EmptyReview from './EmptyReview';
import { useMemo } from 'react';

const WritableReviews = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'PAST',
  });

  const reservationsWithNotWrittenReview = useMemo(
    () => reservations?.filter((reservation) => !reservation.reviewId),
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
