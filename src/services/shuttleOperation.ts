import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authInstance, instance } from './config';
import {
  RouteStatusType,
  ShuttleRouteType,
  ShuttleStatusType,
  ShuttleWithDemandCountType,
} from '@/types/shuttle.types';
import { ArtistType } from '@/types/client.types';
import { CustomError } from './custom-error';

const getArtists = async () => {
  const res = await instance.get<{ artists: ArtistType[] }>(
    '/v1/shuttle-operation/artists',
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

export const getShuttles = async (status?: ShuttleStatusType) => {
  const res = await instance.get<{
    shuttleDetails: ShuttleWithDemandCountType[];
  }>(`/v1/shuttle-operation/shuttles?status=${status}`);
  return res.shuttleDetails;
};

export const getShuttle = async (id: number) => {
  const res = await instance.get<{ shuttleDetail: ShuttleWithDemandCountType }>(
    `/v1/shuttle-operation/shuttles/${id}`,
  );
  return res.shuttleDetail;
};

export const useGetShuttle = (id: number) => {
  return useQuery({
    queryKey: ['shuttle', id],
    queryFn: () => getShuttle(id),
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
  } = {},
) => {
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRouteType[] }>(
    `/v1/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/routes?bigRegion=${bigRegion}&smallRegion=${smallRegion}&status=${status}`,
  );
  return res.shuttleRouteDetails;
};

export const getRoute = async ({
  shuttleId,
  dailyShuttleId,
  shuttleRouteId,
}: {
  shuttleId: number;
  dailyShuttleId: number;
  shuttleRouteId: number;
}) => {
  const res = await instance.get<{ shuttleRouteDetail: ShuttleRouteType }>(
    `/v1/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/routes/${shuttleRouteId}`,
  );
  return res.shuttleRouteDetail;
};

const putShuttleBus = async ({
  shuttleId,
  dailyShuttleId,
  shuttleRouteId,
  shuttleBusId,
  openChatLink,
}: {
  shuttleId: number;
  dailyShuttleId: number;
  shuttleRouteId: number;
  shuttleBusId: number;
  openChatLink: string;
}) => {
  await authInstance.put(
    `/v1/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/routes/${shuttleRouteId}/buses/${shuttleBusId}`,
    { openChatLink },
  );
};

export const usePutShuttleBus = ({
  shuttleId,
  dailyShuttleId,
  shuttleRouteId,
  shuttleBusId,
  reservationId,
  onSuccess,
  onError,
}: {
  shuttleId?: number;
  dailyShuttleId?: number;
  shuttleRouteId?: number;
  shuttleBusId?: number;
  reservationId?: number;
  onSuccess?: () => void;
  onError?: (error: CustomError) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (openChatLink: string) => {
      if (!shuttleId || !dailyShuttleId || !shuttleRouteId || !shuttleBusId) {
        throw new CustomError(400, '셔틀 정보를 입력받지 못했습니다.');
      }
      return putShuttleBus({
        shuttleId,
        dailyShuttleId,
        shuttleRouteId,
        shuttleBusId,
        openChatLink,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservations', reservationId],
      });
      onSuccess?.();
    },
    onError,
  });
};

const getShuttleDemandStats = async (
  shuttleId: number,
  dailyShuttleId: number,
  regionId?: number,
) => {
  const baseUrl = `/v1/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands/all/stats`;
  const queryParams = regionId ? `?regionId=${regionId}` : '';
  const url = `${baseUrl}${queryParams}`;

  const res = await instance.get<{
    count: {
      fromDestinationCount: number;
      roundTripCount: number;
      toDestinationCount: number;
    };
  }>(url);
  return res;
};

export const useGetShuttleDemandStats = (
  shuttleId: number,
  dailyShuttleId: number,
  regionId?: number,
) =>
  useQuery({
    queryKey: ['demandStats', shuttleId, dailyShuttleId, regionId],
    queryFn: () => getShuttleDemandStats(shuttleId, dailyShuttleId, regionId),
    enabled: Boolean(shuttleId && dailyShuttleId),
  });
