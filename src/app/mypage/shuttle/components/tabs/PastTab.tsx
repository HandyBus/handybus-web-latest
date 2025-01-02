import ReservationCard from '../ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/reservation';
import { useMemo } from 'react';
const EmptyView = dynamic(() => import('../EmptyView'));

const PastTab = () => {
  const { data: reservations, isLoading } = useGetUserReservations('PAST');
  const sortedReservations = useMemo(
    () =>
      reservations?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
                buttonText={
                  reservation.hasReview ? '작성한 후기 보기' : '후기 작성하기'
                }
                buttonHref={
                  reservation.hasReview
                    ? '/mypage/reviews'
                    : `/mypage/reviews/write/${reservation.reservationId}`
                }
                subButtonText="예약 상세보기"
                subButtonHref={`/mypage/shuttle/${reservation.reservationId}`}
              />
            ))}
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default PastTab;
