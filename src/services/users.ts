import { AgeType, GenderType, UserType } from '@/types/client.types';
import { authInstance } from './config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { setSession } from '@/utils/handleSession';

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

export const usePutUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      setSession();
      toast.success('핸디버스에 오신 것을 환영합니다!');
      router.push('/');
    },
    onError: (e) => {
      console.error(e);
      toast.error('회원가입에 실패하였습니다.');
    },
  });
};
