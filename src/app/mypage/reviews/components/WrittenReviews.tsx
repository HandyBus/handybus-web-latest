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
        const selectedFromDestinationShuttleRouteHubId =
          reservation.fromDestinationShuttleRouteHubId;
        const arrivalTime =
          tripType === 'TO_DESTINATION' || tripType === 'ROUND_TRIP'
            ? reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
                (hub) => hub.role === 'DESTINATION',
              )?.arrivalTime
            : reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
                (hub) =>
                  hub.shuttleRouteHubId ===
                  selectedFromDestinationShuttleRouteHubId,
              )?.arrivalTime;
        const reviewOpenTime = dayjs(arrivalTime).subtract(1, 'hour');
        const isReviewAvailable =
          (reservation.shuttleRoute.status === 'CLOSED' ||
            reservation.shuttleRoute.status === 'ENDED') &&
          dayjs().isAfter(reviewOpenTime);
        return reservation.reviewId && isReviewAvailable;
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
        fallback={<Loading style="grow" className="pt-64" />}
        isLoading={isLoading}
      >
        {reservationsWithReview &&
          (reservationsWithReview.length === 0 ? (
            <EmptyReview variant="written-review" />
          ) : (
            <ul>
              {reservationsWithReview.map((reservation) => {
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
                    reviewId={reservation.reviewId ?? undefined}
                    event={event}
                    dailyEvent={dailyEvent}
                  />
                );
              })}
            </ul>
          ))}
      </DeferredSuspense>
    </>
  );
};

export default WrittenReviews;
