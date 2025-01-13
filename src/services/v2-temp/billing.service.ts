import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authInstance } from '../config';
import { toast } from 'react-toastify';
import { CustomError } from '../custom-error';
import { silentParse } from '@/utils/config.util';
import {
  PostReservationBody,
  PostReservationBodySchema,
  TempPaymentSchema,
  TempReservationSchema,
} from '@/types/v2-temp/billing.type';

export const postCoupon = async (code: string) => {
  return await authInstance.post('/v1/billing/coupons', { code });
};

export const usePostCoupon = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCoupon,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'coupons'] });
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

export const postRefund = async (paymentId: number, refundReason: string) => {
  await authInstance.post(`/v1/billing/payments/${paymentId}/refunds`, {
    refundReason,
  });
};

export const usePostRefund = (
  paymentId: number,
  refundReason: string,
  { onSuccess }: { onSuccess?: () => void },
) => {
  return useMutation({
    mutationFn: () => postRefund(paymentId, refundReason),
    onSuccess: () => {
      toast.success('환불 신청이 완료되었습니다.');
      onSuccess?.();
    },
    onError: (error: CustomError) => {
      if (error.statusCode === 409) {
        toast.error('이미 환불이 신청되었습니다.');
      } else if (error.statusCode === 403) {
        toast.error('환불 날짜가 지나서 환불 요청을 할 수 없습니다.');
      } else {
        toast.error('환불 신청에 실패했습니다.');
      }
    },
  });
};

// TODO: v2 적용 후 타입 정리
export const postReservation = async (body: PostReservationBody) => {
  const res = await authInstance.post(
    '/v1/billing/reservations',
    silentParse(PostReservationBodySchema, body),
    {
      shape: {
        reservation: TempReservationSchema,
      },
    },
  );
  return res.reservation;
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
