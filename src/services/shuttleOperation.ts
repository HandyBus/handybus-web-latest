import { useQuery } from '@tanstack/react-query';
import { instance } from './config';
import { ArtistType } from '@/types/client.types';

const getArtists = async () => {
  const res = await instance.get<{ artists: ArtistType[] }>(
    '/shuttle-operation/artists',
  );
  return res.artists;
};

export const useGetArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: getArtists,
    initialData: [],
  });
};
