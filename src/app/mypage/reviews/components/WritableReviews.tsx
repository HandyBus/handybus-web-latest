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
    reservationStatus: 'COMPLETE_PAYMENT',
  });

  const reservationsWithNotWrittenReview = useMemo(
    () =>
      reservations?.filter((reservation) => {
        const tripType = reservation.type;
        const selectedFromDestinationShuttleRouteHubId =
          reservation.fromDestinationShuttleRouteHubId;
        const arrivalTime =
          tripType === 'TO_DESTINATION' || tripType === 'ROUND_TRIP'
            ? reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
                (hub) =>
                  hub.sequence ===
                  reservation.shuttleRoute.toDestinationShuttleRouteHubs
                    ?.length,
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

        if (reservation.reviewId) return false;
        if (!isReviewAvailable) return false;
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
