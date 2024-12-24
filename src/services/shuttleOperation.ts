import { useQuery } from '@tanstack/react-query';
import { instance } from './config';
import { ArtistType } from '@/types/client.types';

const getArtists = async () => {
  const res = await instance.get('/shuttle-operation/artists');
  const data: ArtistType[] = res.data?.artists;
  return data;
};

export const useGetArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: getArtists,
    initialData: [],
  });
};
