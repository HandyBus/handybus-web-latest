import { ReservationType } from '@/types/client.types';
import ReservationCard from '../ReservationCard';

interface Props {
  reservations: ReservationType[];
}

const CurrentTab = ({ reservations }: Props) => {
  return (
    <ul>
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          subButtonText="예약 상세보기"
          subButtonHref={`/mypage/shuttle/${reservation.id}`}
        />
      ))}
    </ul>
  );
};

export default CurrentTab;
