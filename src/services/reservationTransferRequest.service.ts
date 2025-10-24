import { ReservationTransferRequestsEntitySchema } from '@/types/reservationTransferRequest.type';
import { authInstance } from './config';
import { ReservationsViewEntitySchema } from '@/types/reservation.type';
import { useMutation, useQuery } from '@tanstack/react-query';

export const getReservationTransferRequestWithToken = async (token: string) => {
  const res = await authInstance.get(
    `/v1/shuttle-operation/reservation-transfer-requests/${token}`,
    {
      shape: {
        reservationTransferRequest: ReservationTransferRequestsEntitySchema,
        reservation: ReservationsViewEntitySchema,
      },
    },
  );
  return res;
};

export const useGetReservationTransferRequestWithToken = (token: string) => {
  return useQuery({
    queryKey: ['reservationTransferRequest', 'token', token],
    queryFn: () => getReservationTransferRequestWithToken(token),
  });
};

export const getReservationTransferRequestWithReservationId = async (
  reservationId: string,
) => {
  const res = await authInstance.get(
    `/v1/shuttle-operation/reservation-transfer-requests/reservation/${reservationId}`,
    {
      shape: {
        reservationTransferRequests:
          ReservationTransferRequestsEntitySchema.array(),
      },
    },
  );
  return res.reservationTransferRequests;
};

export const useGetReservationTransferRequestWithReservationId = (
  reservationId: string,
) => {
  return useQuery({
    queryKey: ['reservationTransferRequest', 'reservationId', reservationId],
    queryFn: () =>
      getReservationTransferRequestWithReservationId(reservationId),
  });
};

export const postCreateReservationTransferRequest = async (
  reservationId: string,
  receiverPhoneNumber: string,
) => {
  const res = await authInstance.post(
    '/v1/shuttle-operation/reservation-transfer-requests',
    {
      reservationId,
      receiverPhoneNumber,
    },
  );
  return res;
};

export const usePostCreateReservationTransferRequest = (
  reservationId: string,
  receiverPhoneNumber: string,
) => {
  return useMutation({
    mutationFn: () =>
      postCreateReservationTransferRequest(reservationId, receiverPhoneNumber),
  });
};

export const postAcceptReservationTransferRequest = async (token: string) => {
  const res = await authInstance.post(
    `/v1/shuttle-operation/reservation-transfer-requests/accept`,
    {
      token,
    },
  );
  return res;
};

export const usePostAcceptReservationTransferRequest = () => {
  return useMutation({
    mutationFn: (token: string) => postAcceptReservationTransferRequest(token),
  });
};

export const putCancelReservationTransferRequest = async (
  reservationTransferRequestId: string,
) => {
  const res = await authInstance.put(
    `/v1/shuttle-operation/reservation-transfer-requests/cancel`,
    {
      reservationTransferRequestId,
    },
  );
  return res;
};

export const usePutCancelReservationTransferRequest = () => {
  return useMutation({
    mutationFn: (reservationTransferRequestId: string) =>
      putCancelReservationTransferRequest(reservationTransferRequestId),
  });
};
