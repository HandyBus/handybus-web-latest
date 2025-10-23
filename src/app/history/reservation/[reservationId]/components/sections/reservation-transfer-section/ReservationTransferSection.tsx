import Button from '@/components/buttons/button/Button';
import WrapperWithDivider from '../../WrapperWithDivider';
import NewIcon from './icons/new.svg';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { checkIsReservationTransferablePeriod } from '@/utils/reservationTransfer.util';
import { useRouter } from 'next/navigation';

interface Props {
  reservation: ReservationsViewEntity;
}

const ReservationTransferSection = ({ reservation }: Props) => {
  const isReservationCanceled = reservation.reservationStatus === 'CANCEL';
  const isReservationTransferablePeriod =
    checkIsReservationTransferablePeriod(reservation);

  const router = useRouter();
  const redirectToReservationTransfer = () => {
    router.push(
      `/history/reservation/${reservation.reservationId}/reservation-transfer`,
    );
  };

  if (isReservationCanceled) {
    return null;
  }

  return (
    <WrapperWithDivider>
      <section className="px-16 py-24">
        <h3 className="relative pb-16 text-16 font-600">
          선물하기
          <div className="absolute left-[57px] top-0">
            <NewIcon />
          </div>
        </h3>
        <p className="pb-16 text-14 font-500 leading-[160%] text-basic-grey-700">
          {isReservationTransferablePeriod
            ? '탑승권은 받는 사람이 24시간 내 수락해야 전달이 완료돼요.'
            : '선물하기는 탑승일 기준 6일 전까지 가능해요.'}
        </p>
        <Button
          type="button"
          variant="tertiary"
          size="large"
          onClick={redirectToReservationTransfer}
          disabled={!isReservationTransferablePeriod}
        >
          {isReservationTransferablePeriod
            ? '탑승권 선물하기'
            : '지금은 선물할 수 없어요'}
        </Button>
      </section>
    </WrapperWithDivider>
  );
};

export default ReservationTransferSection;
