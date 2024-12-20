import { useQuery } from '@tanstack/react-query';
import { instance } from './config';
import { ArtistType } from '@/types/client.types';
import { ShuttleDemandStatus } from '@/types/shuttle.types';

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

const getShuttleDemandStatus = async (
  shuttleId: number,
  dailyShuttleId: number,
  regionId: number | undefined,
) => {
  const baseUrl = `/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands/all/stats`;
  const queryParams = regionId ? `?regionID=${regionId}` : '';
  const queryUrl = `${baseUrl}${queryParams}`;

  const res = await instance.get(queryUrl);
  return res.data;
};

export const useGetShuttleDemandStatus = (
  shuttleId: number,
  dailyShuttleId: number,
  regionId: number | undefined,
) => {
  return useQuery<ShuttleDemandStatus>({
    queryKey: ['demandStatsData', shuttleId, dailyShuttleId, regionId],
    queryFn: () => getShuttleDemandStatus(shuttleId, dailyShuttleId, regionId),
    enabled: Boolean(shuttleId && dailyShuttleId),
  });
};
