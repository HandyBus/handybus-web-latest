import { AgeType, GenderType, UserType } from '@/types/client.types';
import { authInstance } from './config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const getUser = async () => {
  const res = await authInstance.get('/users/me');
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
  const res = await authInstance.put('/users/me', body);
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
