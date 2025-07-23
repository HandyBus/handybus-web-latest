import { authInstance } from './config';
import {
  ApprovePaymentsResponseSchema,
  PaymentsResponseModelSchema,
  PaymentsViewEntitySchema,
  PreparePaymentsRequest,
  PreparePaymentsRequestSchema,
  ReserveRequest,
  ReserveRequestSchema,
  ReserveResponseSchema,
} from '@/types/payment.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { silentParse } from '@/utils/config.util';

// ----- GET -----

export const getUserPayment = async (paymentId: string) => {
  const res = await authInstance.get(
    `/v2/user-management/users/me/payments/${paymentId}`,
    {
      shape: {
        payments: PaymentsViewEntitySchema,
      },
    },
  );
  return res.payments;
};

export const useGetUserPayment = (paymentId: string) =>
  useQuery({
    queryKey: ['user', 'payment', paymentId],
    queryFn: () => getUserPayment(paymentId),
  });

// ----- POST -----
export const postRefund = async (paymentId: string, refundReason: string) => {
  await authInstance.post(`/v1/billing/payments/${paymentId}/refunds`, {
    refundReason,
  });
};

export const usePostRefund = () => {
  return useMutation({
    mutationFn: ({
      paymentId,
      refundReason,
    }: {
      paymentId: string;
      refundReason: string;
    }) => postRefund(paymentId, refundReason),
  });
};

export const postReserveReservation = async (body: ReserveRequest) => {
  const res = await authInstance.post(
    '/v2/shuttle-operation/reservations',
    silentParse(ReserveRequestSchema, body),
    {
      shape: {
        reservation: ReserveResponseSchema,
      },
    },
  );
  return res.reservation;
};

export const postPreparePayment = async (body: PreparePaymentsRequest) => {
  const res = await authInstance.post(
    '/v1/billing/payments',
    silentParse(PreparePaymentsRequestSchema, body),
    {
      shape: {
        payment: PaymentsResponseModelSchema,
      },
    },
  );
  return res.payment;
};

export const postApprovePayment = async (
  paymentId: string,
  paymentKey: string,
) => {
  const res = await authInstance.post(
    `/v1/billing/payments/${paymentId}`,
    {
      paymentKey,
      pgType: 'TOSS',
    },
    {
      shape: {
        payments: ApprovePaymentsResponseSchema,
      },
    },
  );
  return res.payments;
};
