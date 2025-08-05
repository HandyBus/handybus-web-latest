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
import useFunnel from '@/hooks/useFunnel';
import {
  CANCEL_REASON_DETAIL_OPTIONS,
  CANCEL_REASON_OPTIONS,
  REFUND_STEPS,
} from '../const/refund.const';
import useHistory from '../hooks/useHistory';
import useBottomSheetText from '../hooks/useBottomSheetText';
import { useForm } from 'react-hook-form';
import { usePostFeedback } from '@/services/core.service';
import { createFeedbackContent } from '../utils/createFeedbackContent.util';
import RadioInputGroup from './RadioInputGroup';

const USER_CANCELLATION_FEE_REASON = '자동 승인 환불 요청';

export interface CancelReasonForm {
  cancelReason: string;
  cancelReasonDescription: string;
  cancelReasonDetail: string;
  cancelReasonDetailDescription: string;
}

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
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm<CancelReasonForm>({});

  const initialStep = REFUND_STEPS[0];
  const { Funnel, Step, setStep, stepName } = useFunnel(
    REFUND_STEPS,
    initialStep,
  );

  const { title: bottomSheetTitle, description: bottomSheetDescription } =
    useBottomSheetText({ stepName });

  const { isHistoryAvailable, handleBack, setHistoryAndStep } = useHistory({
    stepName,
    setStep,
  });

  const { refundFee, paymentAmount, refundAmount } = useMemo(() => {
    const refundFee = calculateRefundFee(reservation);
    const paymentAmount = reservation?.paymentAmount ?? null;
    const refundAmount =
      paymentAmount !== null && refundFee !== null
        ? paymentAmount - refundFee
        : null;

    return {
      refundFee,
      paymentAmount,
      refundAmount,
    };
  }, [reservation]);

  const isRefundable = useMemo(() => {
    return getIsRefundable(reservation);
  }, [reservation]);

  const { mutateAsync: postRefund, isPending: isRefundPending } =
    usePostRefund();
  const { mutateAsync: putCancelReservation, isPending: isCancelPending } =
    usePutCancelReservation();
  const { mutateAsync: postFeedback, isPending: isFeedbackPending } =
    usePostFeedback();

  const onSubmit = async () => {
    if (!reservation || !reservation.paymentId) {
      return;
    }

    const content = createFeedbackContent(reservation, getValues);

    try {
      await postFeedback({
        subject: '셔틀 예약 취소 사유',
        content,
      });
    } catch (e) {
      console.error(e);
      toast.error('취소 사유를 제출하지 못했어요.');
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

  const handleClickCancelReasonNextButton = async () => {
    const cancelReason = getValues('cancelReason');
    if (!cancelReason) return;

    if (cancelReason === CANCEL_REASON_OPTIONS.OTHER) {
      const isValid = await trigger(['cancelReasonDescription']);
      if (!isValid) return;
    }

    if (cancelReason === CANCEL_REASON_OPTIONS.OTHER_SHUTTLE) {
      setHistoryAndStep('조금만 더 자세히 알려주시겠어요?');
    } else {
      setHistoryAndStep('정말 취소하시겠어요?');
    }
  };

  const handleClickCancelReasonDetailNextButton = async () => {
    const cancelReasonDetail = getValues('cancelReasonDetail');
    if (!cancelReasonDetail) return;

    if (cancelReasonDetail === CANCEL_REASON_DETAIL_OPTIONS.OTHER) {
      const isValid = await trigger(['cancelReasonDetailDescription']);

      if (!isValid) return;
    }

    setHistoryAndStep('정말 취소하시겠어요?');
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title={bottomSheetTitle}
      description={bottomSheetDescription}
      showBackButton={isHistoryAvailable}
      onBack={handleBack}
    >
      <div ref={contentRef} className="max-h-[55dvh] overflow-y-auto">
        <Funnel>
          <Step name="취소하시겠어요?">
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
            <div className="flex flex-col gap-8">
              <Button
                type="button"
                onClick={() => setHistoryAndStep('취소 사유를 알려주세요')}
                variant="s-destructive"
              >
                취소 진행하기
              </Button>
              <Button type="button" onClick={closeBottomSheet} variant="text">
                예약 유지하기
              </Button>
            </div>
          </Step>

          <Step name="취소 사유를 알려주세요">
            <RadioInputGroup
              options={CANCEL_REASON_OPTIONS}
              name="cancelReason"
              otherOptionName="cancelReasonDescription"
              register={register}
              setValue={setValue}
              control={control}
              errors={errors}
            />
            <div className="flex flex-col gap-8">
              <Button
                type="button"
                onClick={handleClickCancelReasonNextButton}
                variant="s-destructive"
              >
                다음
              </Button>
              <Button type="button" onClick={closeBottomSheet} variant="text">
                예약 유지하기
              </Button>
            </div>
          </Step>

          <Step name="조금만 더 자세히 알려주시겠어요?">
            <RadioInputGroup
              options={CANCEL_REASON_DETAIL_OPTIONS}
              name="cancelReasonDetail"
              otherOptionName="cancelReasonDetailDescription"
              register={register}
              setValue={setValue}
              control={control}
              errors={errors}
            />
            <div className="flex flex-col gap-8">
              <Button
                type="button"
                onClick={handleClickCancelReasonDetailNextButton}
                variant="s-destructive"
              >
                다음
              </Button>
              <Button type="button" onClick={closeBottomSheet} variant="text">
                예약 유지하기
              </Button>
            </div>
          </Step>

          <Step name="정말 취소하시겠어요?">
            {refundFee !== null &&
              refundAmount !== null &&
              paymentAmount !== null && (
                <article className="mb-16 flex w-full flex-col items-center justify-center gap-8 rounded-8 bg-basic-grey-50 px-16 py-12">
                  <h5 className="text-16 font-600 leading-[160%] text-basic-grey-700">
                    환불 예정 금액
                  </h5>
                  <p className="text-16 font-600 leading-[160%] text-basic-black">
                    {refundAmount.toLocaleString()}원
                  </p>
                  <p className="text-12 font-500 leading-[160%] text-basic-grey-600">
                    ({paymentAmount.toLocaleString()}원 -{' '}
                    {refundFee.toLocaleString()}원)
                  </p>
                </article>
              )}
            <div className="flex flex-col gap-8">
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                variant="p-destructive"
                disabled={
                  isRefundPending || isCancelPending || isFeedbackPending
                }
              >
                취소하기
              </Button>
              <Button type="button" onClick={closeBottomSheet} variant="text">
                예약 유지하기
              </Button>
            </div>
          </Step>
        </Funnel>
      </div>
    </BottomSheet>
  );
};

export default CancelBottomSheet;
