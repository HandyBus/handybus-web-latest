import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authInstance } from './config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CustomError } from './custom-error';
import { ReservationType } from '@/types/client.types';

const getUserReservations = async (type: 'CURRENT' | 'PAST') => {
  const res = await authInstance.get<{ reservations: ReservationType[] }>(
    `/v1/user-management/users/me/reservations?shuttleProgressStatus=${type}`,
  );
  return res.reservations;
};

export const useGetUserReservations = (type: 'CURRENT' | 'PAST') => {
  return useQuery({
    queryKey: ['user', 'reservations', type],
    queryFn: () => getUserReservations(type),
  });
};

const getUserReservation = async (reservationId: number) => {
  const res = await authInstance.get<{ reservation: ReservationType }>(
    `/v1/user-management/users/me/reservations/${reservationId}`,
  );
  return res.reservation;
};

export const useGetUserReservation = (reservationId: number) => {
  return useQuery({
    queryKey: ['user', 'reservations', reservationId],
    queryFn: () => getUserReservation(reservationId),
  });
};

const postRefund = async (paymentId: number, refundReason: string) => {
  await authInstance.post(`/v1/billing/payments/${paymentId}/refunds`, {
    refundReason,
  });
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
    `/v1/shuttle-operation/reservations/${reservationId}`,
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservations', reservationId],
      });
      onSuccess?.();
    },
    onError,
  });
};
