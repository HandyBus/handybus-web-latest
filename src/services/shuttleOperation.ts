import { useQuery } from '@tanstack/react-query';
import { instance } from './config';
import { ShuttleDemandStatus } from '@/types/shuttle.types';
import { ArtistType, RouteStatusType, RouteType } from '@/types/client.types';

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

const getShuttleDemandStatus = async (
  shuttleId: number,
  dailyShuttleId: number,
  regionId: number | undefined,
) => {
  const baseUrl = `/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands/all/stats`;
  const queryParams = regionId ? `?regionId=${regionId}` : '';
  const queryUrl = `${baseUrl}${queryParams}`;

  const res = await instance.get<ShuttleDemandStatus>(queryUrl);
  return res;
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

export const getRoutes = async (
  shuttleId: number,
  dailyShuttleId: number,
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
  const res = await instance.get<{ shuttleRouteDetails: RouteType[] }>(
    `/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/routes?bigRegion=${bigRegion}&smallRegion=${smallRegion}&status=${status}`,
  );
  return res.shuttleRouteDetails;
};
