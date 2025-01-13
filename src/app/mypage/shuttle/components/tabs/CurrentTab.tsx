'use client';

import ReservationCard from '../ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useMemo } from 'react';
import { useGetUserReservations } from '@/services/user-management.service';
const EmptyView = dynamic(() => import('../EmptyView'));

const CurrentTab = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'CURRENT',
  });
  const sortedReservations = useMemo(
    () =>
      reservations?.sort(
        (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0),
      ),
    [reservations],
  );

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {sortedReservations &&
        (sortedReservations.length === 0 ? (
          <EmptyView />
        ) : (
          <ul>
            {sortedReservations.map((reservation) => (
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
