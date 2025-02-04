import ReservationCard from '../ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/user-management.service';
import { useRouter } from 'next/navigation';
import { Reservation } from '@/types/user-management.type';
const EmptyView = dynamic(() => import('../EmptyView'));

const PastTab = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'PAST',
  });

  const router = useRouter();
  const handleButtonClick = (reservation: Reservation) => {
    if (reservation.hasReview) {
      router.push(`/mypage/reviews/${reservation.reservationId}`);
    } else {
      router.push(`/mypage/reviews/write/${reservation.reservationId}`);
    }
  };

  const handleSubButtonClick = (reservationId: string) => {
    router.push(`/mypage/shuttle/${reservationId}`);
  };

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
                buttonText={
                  reservation.hasReview ? '작성한 후기 보기' : '후기 작성하기'
                }
                onButtonClick={() => handleButtonClick(reservation)}
                buttonColor="primary"
                subButtonText="예약 상세보기"
                onSubButtonClick={() =>
                  handleSubButtonClick(reservation.reservationId)
                }
              />
            ))}
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default PastTab;
