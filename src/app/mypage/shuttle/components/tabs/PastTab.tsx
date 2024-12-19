import { ReservationType } from '@/types/client.types';
import ReservationCard from '../ReservationCard';

interface Props {
  reservations: ReservationType[];
}

const PastTab = ({ reservations }: Props) => {
  return (
    <ul>
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          buttonText={
            reservation.hasReview ? '작성한 후기 보기' : '후기 작성하기'
          }
          // TODO: 후기 작성 및 조회 href 변경
          buttonHref={
            reservation.hasReview
              ? '/mypage/reviews'
              : `/mypage/reviews/write/${reservation.id}`
          }
          subButtonText="예약 상세보기"
          subButtonHref={`/mypage/shuttle/${reservation.id}`}
        />
      ))}
    </ul>
  );
};

export default PastTab;
