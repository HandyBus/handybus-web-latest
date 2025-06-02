'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';
import { useMemo } from 'react';
import { usePostRefund } from '@/services/payment.service';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { calculateRefundFee, getIsRefundable } from '@/utils/reservation.util';
import { useRouter } from 'next/navigation';

interface Props extends BottomSheetRefs {
  reservation: ReservationsViewEntity | null;
  closeBottomSheet: () => void;
}

const CancelBottomSheet = ({
  bottomSheetRef,
  contentRef,
  reservation,
  closeBottomSheet,
}: Props) => {
  const router = useRouter();
  const { mutate: postRefund, isPending } = usePostRefund({
    onSuccess: () => {
      closeBottomSheet();
      router.push('/mypage/shuttle?type=reservation');
    },
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
    return getIsRefundable(reservation);
  }, [reservation]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title="취소하시겠어요?"
      description="예약을 취소하시면 서비스 정책에 따라 취소 수수료가 발생하며 사용하신 결제 수단으로 수수료를 제외한 금액이 자동 환불됩니다."
    >
      <div ref={contentRef} className="max-h-[55dvh] overflow-y-auto">
        {isRefundable && refundFee !== null && (
          <article className="mb-16 flex w-full flex-col items-center justify-center gap-8 rounded-8 bg-basic-grey-50 px-16 py-12">
            <h5 className="text-18 font-600 text-basic-grey-700">
              취소 수수료
            </h5>
            <p className="text-14 font-600 text-basic-red-400">
              {refundFee.toLocaleString()}원
            </p>
          </article>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <Button
          type="button"
          onClick={handleSubmit}
          variant="p-destructive"
          disabled={!isRefundable || isPending}
        >
          취소하기
        </Button>
        <Button type="button" onClick={closeBottomSheet} variant="text">
          닫기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default CancelBottomSheet;
