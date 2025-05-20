'use client';

import Loading from '@/components/loading/Loading';
import ReservationCardForReview from './reservation-card/ReservationCardForReview';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserReservations } from '@/services/reservation.service';
import PeriodFilterBar from '../../components/period-filter-bar/PeriodFilterBar';
import usePeriodFilter from '../../components/period-filter-bar/hooks/usePeriodFilter';
import EmptyReview from './EmptyReview';
import { useMemo } from 'react';

const WrittenReviews = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: reservations, isLoading } = useGetUserReservations({
    monthsAgo: periodFilter,
    eventProgressStatus: 'PAST',
  });

  const reservationsWithReview = useMemo(
    () => reservations?.filter((reservation) => reservation.reviewId),
    [reservations],
  );

  return (
    <>
      <PeriodFilterBar
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
      />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {reservationsWithReview &&
          (reservationsWithReview.length === 0 ? (
            <EmptyReview variant="written-review" />
          ) : (
            <ul>
              {reservationsWithReview.map((reservation) => (
                <ReservationCardForReview
                  key={reservation.reservationId}
                  reservation={reservation}
                  reviewId={reservation.reviewId ?? undefined}
                />
              ))}
            </ul>
          ))}
      </DeferredSuspense>
    </>
  );
};

export default WrittenReviews;
