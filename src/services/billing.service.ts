import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authInstance } from './config';
import { toast } from 'react-toastify';
import { CustomError } from './custom-error';
import { silentParse } from '@/utils/config.util';
import {
  PostReadyPaymentBody,
  PostReadyPaymentBodySchema,
  PostReservationBody,
  PostReservationBodySchema,
  TempPaymentSchema,
  TempReadyPaymentSchema,
  TempReservationSchema,
} from '@/types/billing.type';

export const postCoupon = async (code: string) => {
  return await authInstance.post('/v1/billing/coupons', { code });
};

export const usePostCoupon = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCoupon,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'coupon'] });
      toast.success('쿠폰 등록이 완료되었습니다.');
      onSuccess?.();
    },
    onError: (error: CustomError) => {
      if (error.statusCode === 404) {
        toast.error('쿠폰 코드가 올바르지 않습니다.');
      } else if (error.statusCode === 409) {
        toast.error('이미 등록된 쿠폰입니다.');
      } else if (error.statusCode === 403) {
        toast.error('만료된 쿠폰입니다.');
      } else {
        toast.error('쿠폰 등록에 실패했습니다.');
      }
    },
  });
};

export const postRefund = async (paymentId: string, refundReason: string) => {
  await authInstance.post(`/v1/billing/payments/${paymentId}/refunds`, {
    refundReason,
  });
};

export const usePostRefund = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      paymentId,
      refundReason,
    }: {
      paymentId: string;
      refundReason: string;
    }) => postRefund(paymentId, refundReason),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation'],
      });
      toast.success('예약이 취소되었습니다.');
      onSuccess?.();
    },
    onError: (error: CustomError) => {
      if (error.statusCode === 409) {
        toast.error('이미 환불이 신청되었습니다.');
      } else if (error.statusCode === 403) {
        toast.error('환불 날짜가 지나서 환불 요청을 할 수 없습니다.');
      } else {
        toast.error('예약 취소에 실패했습니다.');
      }
    },
  });
};

// TODO: v2 적용 후 타입 정리
export const postReservation = async (body: PostReservationBody) => {
  const res = await authInstance.post(
    '/v2/shuttle-operation/reservations',
    silentParse(PostReservationBodySchema, body),
    {
      shape: {
        reservation: TempReservationSchema,
      },
    },
  );
  return res.reservation;
};

export const postReadyPayment = async (body: PostReadyPaymentBody) => {
  const res = await authInstance.post(
    '/v1/billing/payments',
    silentParse(PostReadyPaymentBodySchema, body),
    {
      shape: {
        payment: TempReadyPaymentSchema,
      },
    },
  );
  return res.payment;
};

// TODO: v2 적용 후 타입 정리
export const postPayment = async (paymentId: string, paymentKey: string) => {
  const res = await authInstance.post(
    `/v1/billing/payments/${paymentId}`,
    {
      paymentKey,
      pgType: 'TOSS',
    },
    {
      shape: {
        payments: TempPaymentSchema,
      },
    },
  );
  return res.payments;
};
