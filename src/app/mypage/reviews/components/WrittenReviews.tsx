'use client';

import Loading from '@/components/loading/Loading';
import ReservationCardForReview from './reservation-card/ReservationCardForReview';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserReservations } from '@/services/reservation.service';
import PeriodFilterBar from '../../components/period-filter-bar/PeriodFilterBar';
import usePeriodFilter from '../../components/period-filter-bar/hooks/usePeriodFilter';
import EmptyReview from './EmptyReview';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const WrittenReviews = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: reservations, isLoading } = useGetUserReservations({
    monthsAgo: periodFilter,
    reservationStatus: 'COMPLETE_PAYMENT',
  });

  const reservationsWithReview = useMemo(
    () =>
      reservations?.filter((reservation) => {
        const tripType = reservation.type;
        const arrivalTime =
          tripType === 'TO_DESTINATION' || tripType === 'ROUND_TRIP'
            ? reservation.shuttleRoute.toDestinationShuttleRouteHubs?.[
                reservation.shuttleRoute.toDestinationShuttleRouteHubs.length -
                  1
              ]?.arrivalTime
            : reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.[
                reservation.shuttleRoute.fromDestinationShuttleRouteHubs
                  .length - 1
              ]?.arrivalTime;
        const reviewOpenTime = dayjs(arrivalTime).subtract(1, 'hour');
        const isReviewAvailable =
          reservation.shuttleRoute.status === 'CLOSED' &&
          dayjs().isAfter(reviewOpenTime);
        return (
          reservation.reviewId &&
          (reservation.shuttleRoute.status === 'ENDED' || isReviewAvailable)
        );
      }),
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
