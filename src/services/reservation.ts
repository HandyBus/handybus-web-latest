import { useMutation } from '@tanstack/react-query';
import { authInstance } from './config';

const postRefund = async (paymentId: number, refundReason: string) => {
  return await authInstance.post(`/billing/payments/${paymentId}/refunds`, {
    refundReason,
  });
};

export const usePostRefund = (paymentId: number, refundReason: string) => {
  return useMutation({
    mutationFn: () => postRefund(paymentId, refundReason),
  });
};
