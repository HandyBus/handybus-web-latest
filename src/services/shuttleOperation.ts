import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from './config';
import { ArtistType, RouteStatusType, RouteType } from '@/types/client.types';
import { toast } from 'react-toastify';

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

export const deleteDemand = async ({
  shuttleID,
  dailyShuttleID,
  ID,
}: {
  shuttleID: number;
  dailyShuttleID: number;
  ID: number;
}) => {
  return await instance.delete(
    `/shuttle-operation/shuttles/${shuttleID}/dates/${dailyShuttleID}/demands/${ID}`,
  );
};

export const useDeleteDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDemand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('수요조사를 취소했습니다.');
    },
    onError: () => {
      toast.error('수요조사 취소에 실패했습니다.');
    },
  });
};
