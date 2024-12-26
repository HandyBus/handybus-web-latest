import { useMutation } from '@tanstack/react-query';
import { authInstance } from './config';
import revalidateUser from '@/app/actions/revalidateUser';

const postRefund = async (paymentId: number, refundReason: string) => {
  await authInstance.post(`/billing/payments/${paymentId}/refunds`, {
    refundReason,
  });
  revalidateUser();
};

export const usePostRefund = (paymentId: number, refundReason: string) => {
  return useMutation({
    mutationFn: () => postRefund(paymentId, refundReason),
  });
};
