import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authInstance, instance } from './config';
import { ShuttleDemandStatus } from '@/types/shuttle.types';
import { ArtistType, RouteStatusType, RouteType } from '@/types/client.types';
import { EventDetailProps } from '@/types/event.types';
import { CustomError } from './custom-error';

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

export const getShuttle = async (id: number) => {
  const res = await instance.get<{ shuttleDetail: EventDetailProps }>(
    `/shuttle-operation/shuttles/${id}`,
  );
  return res.shuttleDetail;
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
    `/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/routes/${shuttleRouteId}/buses/${shuttleBusId}`,
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
