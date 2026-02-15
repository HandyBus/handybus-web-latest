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
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import { createFeedbackContent } from '../utils/createFeedbackContent.util';
import RadioInputGroup from './RadioInputGroup';
import TextInput from '@/components/inputs/text-input/TextInput';
import { PaymentsViewEntity } from '@/types/payment.type';

const USER_CANCELLATION_FEE_REASON = '자동 승인 환불 요청';

export interface CancelReasonForm {
  cancelReason: string;
  cancelReasonDescription: string;
  cancelReasonDetail: string;
  cancelReasonDetailDescription: string;
  refundAccountNumber: string;
}

interface Props extends BottomSheetRefs {
  reservation: ReservationsViewEntity | null;
  payment: PaymentsViewEntity | null;
  closeBottomSheet: () => void;
  isTransferredReservation: boolean;
}

const CancelBottomSheet = ({
  bottomSheetRef,
  contentRef,
  reservation,
  payment,
  closeBottomSheet,
  isTransferredReservation,
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
    useBottomSheetText({ stepName, isTransferredReservation });

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
    if (!reservation || !reservation.paymentId || !payment) {
      return;
    }

    const content = createFeedbackContent(reservation, getValues);

    try {
      await postFeedback({
        subject: '셔틀 예약 취소 사유',
        content,
      });
    } catch (e) {
      Sentry.captureException(e, {
        tags: {
          component: 'CancelBottomSheet',
          page: 'mypage',
          feature: 'refund',
          action: 'submit-feedback',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          reservationId: reservation.reservationId,
          subject: '셔틀 예약 취소 사유',
          contentLength: content ? content.length : 0,
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(e);
      toast.error('취소 사유를 제출하지 못했어요.');
    }

    try {
      if (isRefundable) {
        const refundAccountNumber = getValues('refundAccountNumber') || null;
        await postRefund({
          paymentId: reservation.paymentId,
          refundReason: USER_CANCELLATION_FEE_REASON,
          refundAccountNumber,
        });
      } else {
        await putCancelReservation(reservation.reservationId);
      }

      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation'],
      });

      toast.success('예약을 취소했어요.');
      closeBottomSheet();
      router.push('/history?type=reservation');
    } catch (e) {
      const error = e as CustomError;
      Sentry.captureException(error, {
        tags: {
          component: 'CancelBottomSheet',
          page: 'mypage',
          feature: 'refund',
          action: 'cancel-reservation',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          reservationId: reservation.reservationId,
          paymentId: reservation.paymentId,
          isRefundable,
          refundFee,
          errorStatusCode: error.statusCode,
          errorMessage: error.message,
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(e);

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
      setHistoryAndStep(REFUND_STEPS[2]);
    } else if (
      payment?.refundExecutionCapability === 'MANUAL' ||
      payment?.refundExecutionCapability === 'UNKNOWN'
    ) {
      setHistoryAndStep(REFUND_STEPS[3]);
    } else {
      setHistoryAndStep(REFUND_STEPS[4]);
    }
  };

  const handleClickCancelReasonDetailNextButton = async () => {
    const cancelReasonDetail = getValues('cancelReasonDetail');
    if (!cancelReasonDetail) return;

    if (cancelReasonDetail === CANCEL_REASON_DETAIL_OPTIONS.OTHER) {
      const isValid = await trigger(['cancelReasonDetailDescription']);

      if (!isValid) return;
    }

    if (
      payment?.refundExecutionCapability === 'MANUAL' ||
      payment?.refundExecutionCapability === 'UNKNOWN'
    ) {
      setHistoryAndStep(REFUND_STEPS[3]);
    } else {
      setHistoryAndStep(REFUND_STEPS[4]);
    }
  };

  const handleClickRefundAccountNumberNextButton = async () => {
    const isValid = await trigger(['refundAccountNumber']);
    if (!isValid) return;

    setHistoryAndStep(REFUND_STEPS[4]);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title={bottomSheetTitle}
      description={bottomSheetDescription}
      showBackButton={isHistoryAvailable}
      onBack={handleBack}
    >
      <div
        ref={contentRef}
        className="max-h-[55dvh] overflow-y-auto scrollbar-hidden"
      >
        <Funnel>
          <Step name={REFUND_STEPS[0]}>
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
                onClick={() => setHistoryAndStep(REFUND_STEPS[1])}
                variant="s-destructive"
              >
                취소 진행하기
              </Button>
              <Button type="button" onClick={closeBottomSheet} variant="text">
                예약 유지하기
              </Button>
            </div>
          </Step>

          <Step name={REFUND_STEPS[1]}>
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

          <Step name={REFUND_STEPS[2]}>
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

          <Step name={REFUND_STEPS[3]}>
            <div className="mb-16">
              <TextInput
                name="refundAccountNumber"
                setValue={setValue}
                control={control}
                placeholder="환불 받을 계좌번호를 정확하게 입력해 주세요."
                rules={{
                  required: '계좌번호를 입력해 주세요.',
                }}
              />
            </div>
            <div className="flex flex-col gap-8">
              <Button
                type="button"
                onClick={handleClickRefundAccountNumberNextButton}
                variant="s-destructive"
              >
                다음
              </Button>
              <Button type="button" onClick={closeBottomSheet} variant="text">
                예약 유지하기
              </Button>
            </div>
          </Step>

          <Step name={REFUND_STEPS[4]}>
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
