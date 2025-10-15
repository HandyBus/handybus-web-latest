import Button from '@/components/buttons/button/Button';
import WrapperWithDivider from '../../WrapperWithDivider';
import NewIcon from './icons/new.svg';
import { ReservationsViewEntity } from '@/types/reservation.type';

interface Props {
  reservation: ReservationsViewEntity;
}

const ReservationTransferSection = ({ reservation }: Props) => {
  const isReservationCanceled = reservation.reservationStatus === 'CANCEL';

  if (isReservationCanceled) {
    return null;
  }

  return (
    <WrapperWithDivider>
      <section className="px-16 py-24">
        <h3 className="relative pb-16 text-16 font-600">
          선물하기
          <div className="absolute left-56 top-0">
            <NewIcon />
          </div>
        </h3>
        <p className="pb-16 text-14 font-500 leading-[160%] text-basic-grey-700">
          탑승권은 받는 사람이 24시간 내 수락해야 전달이 완료돼요.
        </p>
        <Button type="button" variant="tertiary" size="large">
          탑승권 선물하기
        </Button>
      </section>
    </WrapperWithDivider>
  );
};

export default ReservationTransferSection;
