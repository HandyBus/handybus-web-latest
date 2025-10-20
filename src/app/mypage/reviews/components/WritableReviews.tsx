'use client';

import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserReservations } from '@/services/reservation.service';
import EmptyReview from './EmptyReview';
import { useMemo } from 'react';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
import ReservationCardForReview from './ReservationCardForReview';

const WritableReviews = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    reservationStatus: 'COMPLETE_PAYMENT',
    monthsAgo: 3,
  });

  const reservationsWithNotWrittenReview = useMemo(
    () =>
      reservations?.filter((reservation) => {
        const isReviewAvailable = reservation.reviewId !== null;
        if (isReviewAvailable) {
          return false;
        }
        const { isReviewWritingPeriod } =
          checkIsReviewWritingPeriod(reservation);
        return isReviewWritingPeriod;
      }),
    [reservations],
  );

  return (
    <DeferredSuspense
      fallback={<Loading style="grow" className="pt-64" />}
      isLoading={isLoading}
    >
      {reservationsWithNotWrittenReview &&
        (reservationsWithNotWrittenReview.length === 0 ? (
          <EmptyReview variant="writable-review" />
        ) : (
          <ul className="flex flex-col gap-16 px-16 pb-16 pt-24">
            {reservationsWithNotWrittenReview.map((reservation) => {
              const event = reservation.shuttleRoute.event;
              const dailyEvent = event.dailyEvents.find(
                (dailyEvent) =>
                  dailyEvent.dailyEventId ===
                  reservation.shuttleRoute.dailyEventId,
              );
              if (!event || !dailyEvent) {
                return null;
              }
              return (
                <ReservationCardForReview
                  key={reservation.reservationId}
                  reservation={reservation}
                  event={event}
                  dailyEvent={dailyEvent}
                />
              );
            })}
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default WritableReviews;
