import Button from '@/components/buttons/button/Button';
import useBottomSheet from '@/hooks/useBottomSheet';
import CancelBottomSheet from './components/CancelBottomSheet';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { KAKAO_CHANNEL_URL } from '@/constants/common';

interface Props {
  isCanceled: boolean;
  isEnded: boolean;
  reservation: ReservationsViewEntity;
  isTransferredReservation: boolean;
}

const RefundSection = ({
  isCanceled,
  isEnded,
  isTransferredReservation,
  reservation,
}: Props) => {
  const {
    bottomSheetRef: cancelBottomSheetRef,
    contentRef: cancelBottomSheetContentRef,
    openBottomSheet: openCancelBottomSheet,
    closeBottomSheet: closeCancelBottomSheet,
  } = useBottomSheet();

  if (isCanceled || isEnded) {
    return <div className="h-64 w-full" />;
  }

  return (
    <>
      <section className="px-16 py-8">
        <ul className="mb-12 list-inside list-disc pl-8 text-14 font-500 text-basic-grey-500">
          <li>탑승 5일 전 취소 시, 수수료 100%가 발생합니다.</li>
          <li>
            문의사항은{' '}
            <a
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-basic-grey-700 underline underline-offset-2"
            >
              카카오채널
            </a>
            로 문의해 주세요.
          </li>
          {!isTransferredReservation && (
            <li>예약을 취소할 경우, 예약자의 결제 수단으로 환불됩니다.</li>
          )}
        </ul>
        <Button
          variant="s-destructive"
          size="large"
          onClick={openCancelBottomSheet}
        >
          취소하기
        </Button>
      </section>
      <CancelBottomSheet
        isTransferredReservation={isTransferredReservation}
        reservation={reservation}
        bottomSheetRef={cancelBottomSheetRef}
        contentRef={cancelBottomSheetContentRef}
        closeBottomSheet={closeCancelBottomSheet}
      />
    </>
  );
};

export default RefundSection;
