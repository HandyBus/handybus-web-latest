'use client';

import ReservationCard from './reservation-card/ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/reservation.service';
import usePeriodFilter from '../../../components/period-filter-bar/hooks/usePeriodFilter';
import PeriodFilterBar from '../../../components/period-filter-bar/PeriodFilterBar';
const EmptyView = dynamic(() => import('./EmptyView'));

const ReservationTab = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: reservations, isLoading } = useGetUserReservations({
    monthsAgo: periodFilter,
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
            <EmptyView />
          ) : (
            <ul>
              {reservations.map((reservation) => {
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
                  <ReservationCard
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
    </>
  );
};

export default ReservationTab;
