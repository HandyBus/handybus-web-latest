import {
  IssuedCouponSchema,
  IssuedCouponStatus,
  PaymentSchema,
  PutUserBody,
  PutUserBodySchema,
  ReservationSchema,
  ReservationStatus,
  ShuttleDemandSchema,
  ShuttleDemandStatus,
  UserSchema,
  UserStatsSchema,
} from '@/types/user-management.type';
import { authInstance } from './config';
import { toSearchParams } from '@/utils/searchParams.util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReviewSchema } from '@/types/shuttle-operation.type';
import { silentParse } from '@/utils/config.util';
import { CustomError } from './custom-error';

export const getUserDemands = async (status?: ShuttleDemandStatus) => {
  const searchParams = toSearchParams({ status });
  const res = await authInstance.get(
    `/v2/user-management/users/me/demands?${searchParams.toString()}`,
    {
      shape: {
        shuttleDemands: ShuttleDemandSchema.array(),
      },
    },
  );
  return res.shuttleDemands;
};

export const useGetUserDemands = (status?: ShuttleDemandStatus) =>
  useQuery({
    queryKey: ['user', 'demand', status],
    queryFn: () => getUserDemands(status),
  });

export const getUserReservations = async (params?: {
  reservationStatus?: ReservationStatus;
  eventProgressStatus?: 'PAST' | 'CURRENT';
}) => {
  const searchParams = toSearchParams(params);
  const res = await authInstance.get(
    `/v2/user-management/users/me/reservations?${searchParams.toString()}`,
    {
      shape: {
        reservations: ReservationSchema.array(),
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
        reservation: ReservationSchema,
        payment: PaymentSchema,
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

export const getUserPayment = async (paymentId: string) => {
  const res = await authInstance.get(
    `/v2/user-management/users/me/payments/${paymentId}`,
    {
      shape: {
        payments: PaymentSchema,
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

export const getUserReviews = async () => {
  const res = await authInstance.get('/v2/user-management/users/me/reviews', {
    shape: {
      reviews: ReviewSchema.array(),
    },
  });
  return res.reviews;
};

export const useGetUserReviews = () =>
  useQuery({
    queryKey: ['user', 'review'],
    queryFn: getUserReviews,
  });

export const getUserCoupons = async (params?: {
  status?: IssuedCouponStatus;
  validFrom?: string;
  validTo?: string;
}) => {
  const searchParams = toSearchParams(params);
  const res = await authInstance.get(
    `/v2/user-management/users/me/coupons?${searchParams.toString()}`,
    {
      shape: {
        issuedCoupons: IssuedCouponSchema.array(),
      },
    },
  );
  return res.issuedCoupons;
};

export const useGetUserCoupons = (params?: {
  issuedCouponStatus?: IssuedCouponStatus;
  validFrom?: string;
  validTo?: string;
}) =>
  useQuery({
    queryKey: ['user', 'coupon', params],
    queryFn: () => getUserCoupons(params),
  });

export const getUser = async ({
  skipCheckOnboarding = false,
}: { skipCheckOnboarding?: boolean } = {}) => {
  const res = await authInstance.get('/v2/user-management/users/me', {
    shape: {
      user: UserSchema,
    },
    skipCheckOnboarding,
  });
  return res.user;
};

export const useGetUser = ({
  skipCheckOnboarding = false,
  enabled = true,
}: {
  skipCheckOnboarding?: boolean;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser({ skipCheckOnboarding }),
    enabled,
  });
};

export const putUser = async (
  body: PutUserBody,
  options?: { skipCheckOnboarding?: boolean },
) => {
  return await authInstance.put(
    '/v1/user-management/users/me',
    silentParse(PutUserBodySchema, body),
    options,
  );
};

export const usePutUser = ({
  onSuccess,
  onError,
  onSettled,
  options,
}: {
  onSuccess?: () => void;
  onError?: (e: CustomError) => void;
  onSettled?: () => void;
  options?: { skipCheckOnboarding?: boolean };
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PutUserBody) => putUser(body, options),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
      onSuccess?.();
    },
    onError,
    onSettled,
  });
};

const getUserStats = async () => {
  const res = await authInstance.get('/v1/user-management/users/me/stats', {
    shape: {
      userStats: UserStatsSchema,
    },
  });
  return res.userStats;
};

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ['user', 'stats'],
    queryFn: getUserStats,
  });
};

export const deleteUser = async () => {
  await authInstance.delete('/v1/user-management/users/me');
};

export const useDeleteUser = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (e: CustomError) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.();
    },
    onError,
  });
};
