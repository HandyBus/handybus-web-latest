import {
  AgeType,
  GenderType,
  UserDashboardType,
  UserType,
} from '@/types/client.types';
import { authInstance } from './config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const getUser = async () => {
  const res = await authInstance.get('/user-management/users/me');
  const data: UserType = res.data?.user;
  return data;
};

export const getProgress = async () => {
  const res = await authInstance.get('/user-management/users/me');
  const { progresses }: UserType = res.data?.user;

  console.log(res.data?.user);

  const isAgreedServiceTerms = progresses.find(
    (el) => el.type === 'SERVICE_TERMS_AGREEMENT',
  )?.isCompleted;
  const isAgreedPersonalInfo = progresses.find(
    (el) => el.type === 'PERSONAL_INFO_CONSENT',
  )?.isCompleted;
  const isOnboardingComplete = progresses.find(
    (el) => el.type === 'ONBOARDING_COMPLETE',
  )?.isCompleted;

  if (isOnboardingComplete) {
    return 'ONBOARDING_COMPLETE';
  }
  if (isAgreedServiceTerms && isAgreedPersonalInfo) {
    return 'AGREEMENT_COMPLETE';
  }

  return 'AGREEMENT_INCOMPLETE';
};

const putUser = async (body: {
  nickname?: string;
  phoneNumber?: string;
  gender?: GenderType;
  ageRange?: AgeType;
  regionID?: number;
  profileImage?: string;
  favoriteArtistsIDs?: number[];
  isAgreedMarketing?: boolean;
  isAgreedServiceTerms?: boolean;
  isAgreedPersonalInfo?: boolean;
}) => {
  const res = await authInstance.put('/user-management/users/me', body);
  const data: UserType = res.data?.user;
  return data;
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
  onError?: (e: AxiosError) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: putUser,
    onSuccess,
    onError,
    onSettled,
  });
};

const getUserDashboard = async () => {
  const res = await authInstance.get('/user-management/users/me/dashboard');
  const data: UserDashboardType = res.data?.userDashboard;
  return data;
};

export const useGetUserDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getUserDashboard,
  });
};
