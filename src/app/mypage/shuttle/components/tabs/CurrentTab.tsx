import { ReservationType } from '@/types/client.types';
import ReservationCard from '../ReservationCard';
import dynamic from 'next/dynamic';
const EmptyView = dynamic(() => import('../EmptyView'));

interface Props {
  reservations: ReservationType[];
}

const CurrentTab = ({ reservations }: Props) => {
  if (reservations.length === 0) {
    return <EmptyView />;
  }

  return (
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
  );
};

export default CurrentTab;
