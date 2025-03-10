import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authInstance } from './config';
import { CustomError } from './custom-error';
import { toast } from 'react-toastify';
import {
  ReservationStatus,
  ReservationsViewEntitySchema,
} from '@/types/reservation.type';
import { toSearchParams } from '@/utils/searchParams.util';
import { PaymentsViewEntitySchema } from '@/types/payment.type';

// ----- GET -----

export const getUserReservations = async (params?: {
  reservationStatus?: ReservationStatus;
  eventProgressStatus?: 'PAST' | 'CURRENT';
}) => {
  const searchParams = toSearchParams(params);
  const res = await authInstance.get(
    `/v2/user-management/users/me/reservations?${searchParams.toString()}`,
    {
      shape: {
        reservations: ReservationsViewEntitySchema.array(),
      },
    },
  );
  return res.reservations;
};

export const useGetUserReservations = (params?: {
  reservationStatus?: ReservationStatus;
  eventProgressStatus?: 'PAST' | 'CURRENT';
}) =>
  useQuery({
    queryKey: ['user', 'reservation', params],
    queryFn: () => getUserReservations(params),
  });

export const getUserReservation = async (reservationId: string) => {
  const res = await authInstance.get(
    `/v2/user-management/users/me/reservations/${reservationId}`,
    {
      shape: {
        reservation: ReservationsViewEntitySchema,
        payment: PaymentsViewEntitySchema,
      },
    },
  );
  return res;
};

export const useGetUserReservation = (reservationId: string) =>
  useQuery({
    queryKey: ['user', 'reservation', reservationId],
    queryFn: () => getUserReservation(reservationId),
  });

// ----- POST -----

const postUpdateReservation = async (
  reservationId: string,
  body?: {
    toDestinationShuttleRouteHubId?: string;
    fromDestinationShuttleRouteHubId?: string;
    isSupportingHandy?: boolean;
  },
) => {
  return await authInstance.put(
    `/v1/shuttle-operation/reservations/${reservationId}`,
    body,
  );
};

export const usePostUpdateReservation = (
  reservationId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (e: CustomError) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body?: {
      toDestinationShuttleRouteHubId?: string;
      fromDestinationShuttleRouteHubId?: string;
      isSupportingHandy?: boolean;
    }) => postUpdateReservation(reservationId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation', reservationId],
      });
      toast.success('탑승지를 변경했어요.');
      onSuccess?.();
    },
    onError: (e) => {
      const error = e as CustomError;
      toast.error('탑승지를 변경하지 못했어요.');
      onError?.(error);
    },
  });
};
