import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authInstance } from './config';
import revalidateUser from '@/app/actions/revalidateUser.action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CustomError } from './custom-error';

const postRefund = async (paymentId: number, refundReason: string) => {
  await authInstance.post(`/billing/payments/${paymentId}/refunds`, {
    refundReason,
  });
  revalidateUser();
};

export const usePostRefund = (paymentId: number, refundReason: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => postRefund(paymentId, refundReason),
    onSuccess: () => {
      router.push('/mypage/shuttle?type=current');
      toast.success('환불 신청이 완료되었습니다.');
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

interface UpdateReservationBody {
  toDestinationShuttleRouteHubId?: number;
  fromDestinationShuttleRouteHubId?: number;
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
