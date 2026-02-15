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
import { z } from 'zod';
import { ReferralsViewEntitySchema } from '@/types/referral.type';

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

export const getReferral = async (referralCode: string) => {
  const res = await authInstance.get(`/v1/billing/referrals/${referralCode}`, {
    shape: {
      referral: ReferralsViewEntitySchema,
    },
  });
  return res.referral;
};

export const useGetReferral = (referralCode?: string) => {
  return useQuery({
    queryKey: ['referral', referralCode],
    queryFn: () => getReferral(referralCode!),
    enabled: !!referralCode,
  });
};

// ----- POST -----
export const postRefund = async (
  paymentId: string,
  refundReason: string,
  refundAccountNumber: string | null,
) => {
  await authInstance.post(`/v1/billing/payments/${paymentId}/refunds`, {
    refundReason,
    refundAccountNumber,
  });
};

export const usePostRefund = () => {
  return useMutation({
    mutationFn: ({
      paymentId,
      refundReason,
      refundAccountNumber,
    }: {
      paymentId: string;
      refundReason: string;
      refundAccountNumber: string | null;
    }) => postRefund(paymentId, refundReason, refundAccountNumber),
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
  paymentKey: string | null | undefined,
) => {
  const res = await authInstance.post(
    `/v1/billing/payments/${paymentId}`,
    paymentKey
      ? {
          paymentKey,
          pgType: 'TOSS',
        }
      : undefined,
    {
      shape: {
        payments: ApprovePaymentsResponseSchema,
      },
    },
  );
  return res.payments;
};

export const postCreateReferral = async (reservationId: string) => {
  const res = await authInstance.post(
    '/v1/billing/referrals',
    { reservationId },
    {
      shape: {
        referralId: z.string(),
        referralCode: z.string(),
      },
    },
  );
  return res;
};
