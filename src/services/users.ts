import {
  AgeType,
  GenderType,
  UserDashboardType,
  UserStatsType,
  UserType,
} from '@/types/client.types';
import { authInstance } from './config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { parseProgress } from '@/utils/parseProgress';
import { CustomError } from './custom-error';
import revalidateUser from '@/app/actions/revalidateUser.action';

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

const getUserStats = async () => {
  const res = await authInstance.get<{ userStats: UserStatsType }>(
    '/user-management/users/me/stats',
    { next: { tags: ['user'] } },
  );
  return res.userStats;
};

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ['user', 'stats'],
    queryFn: getUserStats,
  });
};
