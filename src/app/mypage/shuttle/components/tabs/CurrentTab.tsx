'use client';

import ReservationCard from '../ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/user-management.service';
const EmptyView = dynamic(() => import('../EmptyView'));

const CurrentTab = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'CURRENT',
  });

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
                subButtonText="예약 상세보기"
                subButtonHref={`/mypage/shuttle/${reservation.reservationId}`}
              />
            ))}
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default CurrentTab;
