import { useMutation, useQueryClient } from '@tanstack/react-query';
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

interface UpdateReservationBody {
  pickupHubId?: number;
  dropoffHubId?: number;
  isSupportingHandy?: boolean;
}

const postUpdateReservation = async (
  reservationId: number,
  body: UpdateReservationBody,
) => {
  return await authInstance.put(
    `/shuttle-operation/reservations/${reservationId}`,
    body,
  );
};

export const usePostUpdateReservation = (
  reservationId: number,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateReservationBody) =>
      postUpdateReservation(reservationId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });
      onSuccess?.();
    },
    onError,
  });
};
