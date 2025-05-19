'use client';

import Loading from '@/components/loading/Loading';
import ReservationCard from '../../shuttle/components/reservations/reservation-card/ReservationCard';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserReservations } from '@/services/reservation.service';
import PeriodFilterBar from '../../shuttle/components/period-filter-bar/PeriodFilterBar';
import usePeriodFilter from '../../shuttle/components/period-filter-bar/hooks/usePeriodFilter';
import EmptyReview from './EmptyReview';

const WrittenReviews = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: reservations, isLoading } = useGetUserReservations({
    monthsAgo: periodFilter,
    eventProgressStatus: 'PAST',
  });

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
        {reservations &&
          (reservations.length === 0 ? (
            <EmptyReview variant="written-review" />
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
    </>
  );
};

export default WrittenReviews;
