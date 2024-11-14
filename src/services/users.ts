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

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};

const putUser = async (body: {
  nickname?: string;
  gender?: GenderType;
  ageRange?: AgeType;
  regionID?: number;
  profileImage?: string;
  favoriteArtistsIDs?: number[];
}) => {
  const res = await authInstance.put('/user-management/users/me', body);
  const data: UserType = res.data?.user;
  return data;
};

export const usePutNickname = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation({
    mutationFn: (nickname: string) => putUser({ nickname }),
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
  const data: UserDashboardType = res.data?.userDashboard?.['_props'];
  return data;
};

export const useGetUserDashboard = () => {
  return useQuery({
    queryKey: ['userDashboard'],
    queryFn: getUserDashboard,
  });
};
