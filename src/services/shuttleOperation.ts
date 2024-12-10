import { useQuery } from '@tanstack/react-query';
import { instance } from './config';
import { ArtistType, RouteStatusType, RouteType } from '@/types/client.types';

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

export const getRoutes = async (
  shuttleID: number,
  dailyShuttleID: number,
  {
    bigRegion,
    smallRegion,
    status = 'OPEN',
  }: {
    bigRegion?: string;
    smallRegion?: string;
    status?: RouteStatusType;
  },
) => {
  const res = await instance.get(
    `/shuttle-operation/shuttles/${shuttleID}/dates/${dailyShuttleID}/routes`,
    {
      params: {
        bigRegion,
        smallRegion,
        status,
      },
    },
  );
  const data: RouteType[] = res.data?.shuttleRouteDetails;
  return data;
};
