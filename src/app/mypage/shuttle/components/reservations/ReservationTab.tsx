import ReservationCard from './reservation-card/ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/reservation.service';
const EmptyView = dynamic(() => import('./EmptyView'));

const PastTab = () => {
  const { data: reservations, isLoading } = useGetUserReservations();

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {reservations &&
        (reservations.length === 0 ? (
          <EmptyView />
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

export default PastTab;
