import ReservationCard from '../ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservations } from '@/services/reservation.service';
import { useRouter } from 'next/navigation';
import { ReservationsViewEntity } from '@/types/reservation.type';
const EmptyView = dynamic(() => import('../EmptyView'));

const PastTab = () => {
  const { data: reservations, isLoading } = useGetUserReservations({
    eventProgressStatus: 'PAST',
  });

  const router = useRouter();
  const handleReviewClick = (reservation: ReservationsViewEntity) => {
    if (reservation.hasReview) {
      router.push('/mypage/reviews');
    } else {
      router.push(`/mypage/reviews/write/${reservation.reservationId}`);
    }
  };

  const handleReservationDetailClick = (reservationId: string) => {
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
                buttonText="예약 상세보기"
                onButtonClick={() =>
                  handleReservationDetailClick(reservation.reservationId)
                }
                subButtonText={
                  reservation.hasReview ? '작성한 후기 보기' : '후기 작성하기'
                }
                onSubButtonClick={() => handleReviewClick(reservation)}
                subButtonColor={reservation.hasReview ? 'grey' : 'primary'}
              />
            ))}
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default PastTab;
