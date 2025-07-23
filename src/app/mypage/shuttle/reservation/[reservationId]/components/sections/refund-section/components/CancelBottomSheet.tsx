'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';
import { useMemo } from 'react';
import { usePostRefund } from '@/services/payment.service';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { calculateRefundFee, getIsRefundable } from '@/utils/reservation.util';
import { useRouter } from 'next/navigation';
import { usePutCancelReservation } from '@/services/reservation.service';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CustomError } from '@/services/custom-error';

const USER_CANCELLATION_FEE_REASON = '자동 승인 환불 요청';

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
  const queryClient = useQueryClient();

  const refundFee = useMemo(
    () => calculateRefundFee(reservation),
    [reservation],
  );
  const isRefundable = useMemo(() => {
    return getIsRefundable(reservation);
  }, [reservation]);

  const { mutateAsync: postRefund, isPending: isRefundPending } =
    usePostRefund();
  const { mutateAsync: putCancelReservation, isPending: isCancelPending } =
    usePutCancelReservation();

  const handleSubmit = async () => {
    if (!reservation || !reservation.paymentId) {
      return;
    }
    try {
      if (isRefundable) {
        await postRefund({
          paymentId: reservation.paymentId,
          refundReason: USER_CANCELLATION_FEE_REASON,
        });
      } else {
        await putCancelReservation(reservation.reservationId);
      }

      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation'],
      });

      toast.success('예약을 취소했어요.');
      closeBottomSheet();
      router.push('/mypage/shuttle?type=reservation');
    } catch (e) {
      console.error(e);
      const error = e as CustomError;

      if (error.statusCode === 409) {
        toast.error('이미 환불을 신청한 셔틀이에요.');
      } else if (error.statusCode === 403) {
        toast.error('환불 날짜가 지나서 환불이 어려워요.');
      } else {
        toast.error('예약을 취소하지 못했어요.');
      }
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title="취소하시겠어요?"
      description="예약을 취소하시면 서비스 정책에 따라 취소 수수료가 발생하며 사용하신 결제 수단으로 수수료를 제외한 금액이 자동 환불됩니다."
    >
      <div ref={contentRef} className="max-h-[55dvh] overflow-y-auto">
        {refundFee !== null && (
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
          disabled={isRefundPending || isCancelPending}
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
