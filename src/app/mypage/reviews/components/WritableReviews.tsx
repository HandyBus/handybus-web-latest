'use client';

import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import ReservationCard from '../../shuttle/components/reservations/reservation-card/ReservationCard';
import { useGetUserReservations } from '@/services/reservation.service';
import EmptyReview from './EmptyReview';

const WritableReviews = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'PAST',
  });

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {reservations &&
        (reservations.length === 0 ? (
          <EmptyReview variant="writable-review" />
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <ReservationCard
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
