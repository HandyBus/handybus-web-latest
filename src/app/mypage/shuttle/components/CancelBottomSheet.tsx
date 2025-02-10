import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';
import useFunnel from '@/hooks/useFunnel';
import { useEffect, useMemo } from 'react';
import RefundPolicy from '../[id]/components/RefundPolicy';
import { CancellationAndRefundContent } from '@/components/notice-section/NoticeSection';
import { usePostRefund } from '@/services/billing.service';
import { Reservation } from '@/types/user-management.type';
import { calculateRefundFee } from '../utils/calculateRefundFee';
import dayjs from 'dayjs';
import { calculateDDay } from '../utils/calculateDDay';

const REFUND_DDAY_TIME_LIMIT = 24 * 60 * 60 * 1000; // 24시간
const REFUND_DAY_LIMIT = 5; // 5일

const CANCEL_STEP = ['취소 및 환불 안내', '취소 수수료'] as const;

interface Props extends BottomSheetRefs {
  reservation: Reservation | null;
  isOpen: boolean;
  closeBottomSheet: () => void;
}

const CancelBottomSheet = ({
  bottomSheetRef,
  contentRef,
  reservation,
  isOpen,
  closeBottomSheet,
}: Props) => {
  const { Funnel, Step, handleNextStep, handlePrevStep, setStep, stepName } =
    useFunnel(CANCEL_STEP);

  const dDay = useMemo(() => calculateDDay(reservation), [reservation]);

  const refundFee = useMemo(
    () =>
      calculateRefundFee({
        paymentAmount: reservation?.paymentAmount ?? undefined,
        createdAt: dayjs(reservation?.createdAt),
        dDay,
      }),
    [reservation?.paymentAmount, reservation?.createdAt, dDay],
  );

  useEffect(() => {
    if (!isOpen) {
      setStep('취소 및 환불 안내');
    }
  }, [isOpen]);

  const { mutate: postRefund, isPending } = usePostRefund({
    onSuccess: () => closeBottomSheet(),
  });

  const checkIsRefundable = () => {
    if (!reservation) {
      return false;
    }
    const reservationDate = new Date(reservation.createdAt);
    const shuttleDate = new Date(
      reservation.shuttleRoute.event.dailyEvents.find(
        (dailyEvent) =>
          dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
      )?.date ?? '',
    );
    const currentDate = new Date();

    const diffTime = currentDate.getTime() - reservationDate.getTime();
    if (diffTime < REFUND_DDAY_TIME_LIMIT) {
      return true;
    }
    const diffDays = Math.ceil(
      (shuttleDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays >= REFUND_DAY_LIMIT) {
      return true;
    }
    return false;
  };
  const isRefundable = useMemo(() => checkIsRefundable(), [reservation]);

  const handleSubmit = () => {
    if (!reservation || !reservation.paymentId) {
      return;
    }
    postRefund({
      paymentId: reservation.paymentId,
      refundReason: '자동 승인 환불 요청',
    });
  };

  return (
    <BottomSheet ref={bottomSheetRef} title={stepName}>
      <div ref={contentRef}>
        <Funnel>
          <Step name="취소 및 환불 안내">
            <section>
              <RefundPolicy />
              <div className="py-16">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  variant="secondary"
                >
                  다음
                </Button>
              </div>
              <div className="fixed -mx-32 h-400 w-full bg-white" />
            </section>
          </Step>
          <Step name="취소 수수료">
            <section>
              <CancellationAndRefundContent dDay={dDay} refundFee={refundFee} />
              <div className="flex gap-8 py-16">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="secondary"
                >
                  이전
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="alert"
                  disabled={!isRefundable || isPending}
                >
                  예약 취소
                </Button>
              </div>
            </section>
          </Step>
        </Funnel>
      </div>
    </BottomSheet>
  );
};

export default CancelBottomSheet;
