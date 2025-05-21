import Button from '@/components/buttons/button/Button';
import useBottomSheet from '@/hooks/useBottomSheet';
import CancelBottomSheet from './components/CancelBottomSheet';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { getIsRefundable } from './utils/refund.util';

interface Props {
  isCanceled: boolean;
  reservation: ReservationsViewEntity;
}

const RefundSection = ({ isCanceled, reservation }: Props) => {
  const {
    bottomSheetRef: cancelBottomSheetRef,
    contentRef: cancelBottomSheetContentRef,
    openBottomSheet: openCancelBottomSheet,
    closeBottomSheet: closeCancelBottomSheet,
  } = useBottomSheet();

  const isRefundable = getIsRefundable(reservation);

  if (isCanceled) {
    return <div className="h-64 w-full" />;
  }

  return (
    <>
      <section className="px-16 py-8">
        <ul className="mb-12 list-inside list-disc pl-8 text-14 font-500 text-basic-grey-500">
          <li>예약 취소는 탑승 5일 전까지 가능합니다.</li>
          <li>
            문의사항은{' '}
            <a
              href="http://pf.kakao.com/_AxncxhG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-basic-grey-700 underline underline-offset-2"
            >
              카카오채널
            </a>
            로 문의해 주세요.
          </li>
        </ul>
        <Button
          variant="s-destructive"
          size="large"
          disabled={!isRefundable}
          onClick={openCancelBottomSheet}
        >
          취소하기
        </Button>
      </section>
      <CancelBottomSheet
        reservation={reservation}
        bottomSheetRef={cancelBottomSheetRef}
        contentRef={cancelBottomSheetContentRef}
        closeBottomSheet={closeCancelBottomSheet}
      />
    </>
  );
};

export default RefundSection;
