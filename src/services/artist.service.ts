import { useQuery } from '@tanstack/react-query';
import { instance } from './config';
import { ArtistsViewEntitySchema } from '@/types/artist.type';

// ----- GET -----

export const getArtists = async () => {
  const res = await instance.get('/v2/shuttle-operation/artists', {
    shape: {
      artists: ArtistsViewEntitySchema.array(),
    },
  });
  return res.artists;
};

export const useGetArtists = () =>
  useQuery({
    queryKey: ['artist'],
    queryFn: getArtists,
  });
