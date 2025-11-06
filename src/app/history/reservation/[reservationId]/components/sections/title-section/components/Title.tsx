import { ReservationStatus } from '@/types/reservation.type';
import PrimaryCheckIcon from '../icons/check-primary.svg';
import { ShuttleRouteStatus } from '@/types/shuttleRoute.type';

interface Props {
  reservationStatus: ReservationStatus;
  shuttleRouteStatus: ShuttleRouteStatus;
}

const Title = ({ reservationStatus, shuttleRouteStatus }: Props) => {
  if (reservationStatus === 'CANCEL') {
    return (
      <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-18 font-600 text-basic-red-400">
        예약 취소
      </h1>
    );
  }
  if (
    reservationStatus === 'COMPLETE_PAYMENT' &&
    (shuttleRouteStatus === 'ENDED' || shuttleRouteStatus === 'INACTIVE')
  ) {
    return (
      <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-18 font-600 text-basic-grey-500">
        <span>셔틀 종료</span>
      </h1>
    );
  }
  return (
    <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-18 font-600">
      <PrimaryCheckIcon />
      <span>예약 완료</span>
    </h1>
  );
};

export default Title;
