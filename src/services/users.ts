import {
  AgeType,
  GenderType,
  ReservationType,
  ReviewType,
  UserDashboardType,
  UserType,
} from '@/types/client.types';
import { authInstance } from './config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { parseProgress } from '@/utils/parseProgress';
import { CustomError } from './custom-error';
import revalidateUser from '@/app/actions/revalidateUser.action';
import { toast } from 'react-toastify';

export const getUser = async () => {
  const res = await authInstance.get<{ user: UserType }>(
    '/user-management/users/me',
    { next: { tags: ['user'] } },
  );
  return res.user;
};

export type OnboardingProgress =
  | 'AGREEMENT_INCOMPLETE'
  | 'AGREEMENT_COMPLETE'
  | 'ONBOARDING_COMPLETE';

export const getProgress = async (): Promise<OnboardingProgress> => {
  const res = await authInstance.get<{ user: UserType }>(
    '/user-management/users/me',
    { next: { tags: ['user'] } },
  );
  return parseProgress(res.user.progresses);
};

const putUser = async (body: {
  nickname?: string;
  phoneNumber?: string;
  gender?: GenderType;
  ageRange?: AgeType;
  regionId?: number;
  profileImage?: string;
  favoriteArtistsIds?: number[];
  isAgreedMarketing?: boolean;
  isAgreedServiceTerms?: boolean;
  isAgreedPersonalInfo?: boolean;
}) => {
  const res = await authInstance.put<{ user: UserType }>(
    '/user-management/users/me',
    body,
  );
  revalidateUser();
  return res.user;
};

export const usePutNickname = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (nickname: string) => putUser({ nickname }),
    onSuccess,
    onError,
  });
};

export const usePutAgreement = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (body: {
      isAgreedMarketing: boolean;
      isAgreedServiceTerms: boolean;
      isAgreedPersonalInfo: boolean;
    }) => putUser(body),
    onSuccess,
    onError,
  });
};

export const usePutUser = ({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: () => void;
  onError?: (e: CustomError) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: putUser,
    onSuccess,
    onError,
    onSettled,
  });
};

export const getUserDashboard = async () => {
  const res = await authInstance.get<{ userDashboard: UserDashboardType }>(
    '/user-management/users/me/dashboard',
    { next: { tags: ['user'] } },
  );
  return res.userDashboard;
};

export const useGetUserDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getUserDashboard,
  });
};

export const deleteUser = async () => {
  await authInstance.delete('/user-management/users/me');
  revalidateUser();
};

const getUserReservation = async (reservationId: number) => {
  const res = await authInstance.get<{ reservation: ReservationType }>(
    `user-management/users/me/reservations/${reservationId}`,
  );
  return res.reservation;
};

export const useGetUserReservation = (reservationId: number) => {
  return useQuery({
    queryKey: ['user', 'reservation', reservationId],
    queryFn: () => getUserReservation(reservationId),
  });
};

const getAllUserReview = async () => {
  const res = await authInstance.get<{ reviews: ReviewType[] }>(
    '/user-management/users/me/reviews',
  );
  return res.reviews;
};

export const useGetAllUserReview = () => {
  return useQuery({
    queryKey: ['user', 'review'],
    queryFn: getAllUserReview,
    initialData: [],
  });
};

const postUserReview = async (body: {
  shuttleId: number;
  reservationId: number;
  rating: number;
  content: string;
  images: {
    imageUrl: string;
  }[];
}) => {
  return await authInstance.post('/shuttle-operation/reviews', body);
};

export const usePostUserReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'review'] });
      toast.success('후기를 작성해주셔서 감사합니다!');
    },
    onError: () => {
      toast.error('후기 작성에 실패하였습니다.');
    },
  });
};
