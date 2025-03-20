import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';
import useFunnel from '@/hooks/useFunnel';
import { useEffect, useMemo } from 'react';
import RefundPolicy from '../[id]/components/RefundPolicy';
import { usePostRefund } from '@/services/payment.service';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { calculateRefundFee } from '../utils/refund.util';
import { CancellationAndRefundContent } from '@/components/notice-section/NoticeSection';

const CANCEL_STEP = ['취소 및 환불 안내', '취소 수수료'] as const;

interface Props extends BottomSheetRefs {
  reservation: ReservationsViewEntity | null;
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

  useEffect(() => {
    if (!isOpen) {
      setStep('취소 및 환불 안내');
    }
  }, [isOpen]);

  const { mutate: postRefund, isPending } = usePostRefund({
    onSuccess: () => closeBottomSheet(),
  });

  const handleSubmit = () => {
    if (!reservation || !reservation.paymentId) {
      return;
    }
    postRefund({
      paymentId: reservation.paymentId,
      refundReason: '자동 승인 환불 요청',
    });
  };

  const refundFee = useMemo(
    () => calculateRefundFee(reservation),
    [reservation],
  );

  const isRefundable = useMemo(() => {
    const paymentAmount = reservation?.paymentAmount;
    if (!reservation || !paymentAmount || refundFee === null) {
      return false;
    }
    return refundFee !== paymentAmount;
  }, [refundFee, reservation]);

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
                  variant="tertiary"
                >
                  다음
                </Button>
              </div>
              <div className="fixed -mx-32 h-400 w-full bg-basic-white" />
            </section>
          </Step>
          <Step name="취소 수수료">
            <section>
              <div className="max-h-[55dvh] overflow-y-auto">
                <CancellationAndRefundContent />
                {isRefundable && refundFee !== null && (
                  <article className="mt-16 bg-basic-grey-50 p-8 text-center text-14 font-700 text-basic-red-500">
                    취소 수수료: {refundFee.toLocaleString()}원
                  </article>
                )}
              </div>
              <div className="flex gap-8 py-16">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="tertiary"
                >
                  이전
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="p-destructive"
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
