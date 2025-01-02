import { toast } from 'react-toastify';
import { authInstance } from './config';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ID_TO_REGION } from '@/constants/regions';
import { getRoutes } from './shuttleOperation';
import { ShuttleDemandType } from '@/types/client.types';

const getUserDemands = async () => {
  const res = await authInstance.get<{ shuttleDemands: ShuttleDemandType[] }>(
    '/user-management/users/me/demands',
  );
  return res.shuttleDemands;
};

export const useGetUserDemands = () => {
  return useQuery({
    queryKey: ['user', 'demands'],
    queryFn: getUserDemands,
  });
};

const deleteDemand = async ({
  shuttleId,
  dailyShuttleId,
  shuttleDemandId: Id,
}: {
  shuttleId: number;
  dailyShuttleId: number;
  shuttleDemandId: number;
}) => {
  await authInstance.delete(
    `/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands/${Id}`,
  );
};

export const useDeleteDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDemand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'demands'] });
      toast.success('수요조사를 취소했습니다.');
    },
    onError: () => {
      toast.error('수요조사 취소에 실패했습니다.');
    },
  });
};

const getReservationOngoingDemand = async (demand: ShuttleDemandType) => {
  if (demand.status !== 'SHUTTLE_ASSIGNED') {
    return null;
  }
  const region = ID_TO_REGION[demand.regionId];
  const routes = await getRoutes(
    demand.shuttle.shuttleId,
    demand.dailyShuttleId,
    region,
  );
  if (routes.length === 0) {
    return null;
  }
  return demand;
};

export const useGetReservationOngoingDemands = (demands: ShuttleDemandType[]) =>
  useQueries<Array<ShuttleDemandType | null>>({
    queries: demands.map((demand) => ({
      queryKey: [
        'user',
        'demands',
        'reservationOngoing',
        demand.shuttleDemandId,
      ],
      queryFn: () => getReservationOngoingDemand(demand),
      enabled: !!demands,
    })),
  });
