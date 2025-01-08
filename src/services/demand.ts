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
import { TripType } from '@/types/shuttle.types';
import { CustomError } from './custom-error';
import { useRouter } from 'next/navigation';

const getUserDemands = async () => {
  const res = await authInstance.get<{ shuttleDemands: ShuttleDemandType[] }>(
    '/v1/user-management/users/me/demands',
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
    `/v1/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands/${Id}`,
  );
};

export const useDeleteDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDemand,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'demands'] });
      toast.success('수요조사를 취소했습니다.');
    },
    onError: () => {
      toast.error('수요조사 취소에 실패했습니다.');
    },
  });
};

const getReservationOngoingDemand = async (demand: ShuttleDemandType) => {
  if (!demand.hasShuttleRoute) {
    return null;
  }
  const region = ID_TO_REGION[demand.regionId];
  const routes = await getRoutes(
    demand.shuttle.shuttleId,
    demand.dailyShuttleId,
    {
      provinceFullName: region.bigRegion,
      cityFullName: region.smallRegion,
      status: 'OPEN',
    },
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

interface PostDemandBody {
  regionId: number;
  type: TripType;
  passengerCount: number;
  toDestinationRegionHub?: {
    regionHubId?: number;
    desiredRegionHub?: string;
  };
  fromDestinationRegionHub?: {
    regionHubId?: number;
    desiredRegionHub?: string;
  };
}

const postDemand = async (
  shuttleId: number,
  dailyShuttleId: number,
  body: PostDemandBody,
) => {
  await authInstance.post(
    `/v1/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands`,
    body,
  );
};

export const usePostDemand = (shuttleId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (body: PostDemandBody & { dailyShuttleId: number }) =>
      postDemand(shuttleId, body.dailyShuttleId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'demands'] });
      toast.success(
        '해당 셔틀이 개설되면 마이페이지에서 확인해보실 수 있어요!',
      );
      router.push(`/demand/${shuttleId}`);
    },
    onError: (e) => {
      const error = e as CustomError;
      if (error.statusCode === 409) {
        toast.error('해당 일자와 경로의 수요조사를 이미 신청완료했어요.');
        return;
      }
      toast.error('수요조사 신청에 실패했습니다.');
    },
  });
};
