import {
  CreateShuttleDemandRequest,
  CreateShuttleDemandRequestSchema,
  ShuttleDemandStatisticsReadModelSchema,
  ShuttleDemandStatus,
  ShuttleDemandsViewEntitySchema,
} from '@/types/demand.type';
import { authInstance, instance } from './config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toSearchParams } from '@/utils/searchParams.util';
import { silentParse } from '@/utils/config.util';
import { toast } from 'react-toastify';
import { CustomError } from './custom-error';

// ----- GET -----

export const getUserDemands = async (status?: ShuttleDemandStatus) => {
  const searchParams = toSearchParams({ status });
  const res = await authInstance.get(
    `/v2/user-management/users/me/demands?${searchParams.toString()}`,
    {
      shape: {
        shuttleDemands: ShuttleDemandsViewEntitySchema.array(),
      },
    },
  );
  return res.shuttleDemands;
};

export const useGetUserDemands = (status?: ShuttleDemandStatus) =>
  useQuery({
    queryKey: ['user', 'demand', status],
    queryFn: () => getUserDemands(status),
  });

export const getAllEventDemandStats = async (eventId: string) => {
  const res = await instance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/all/demands/all/stats`,
    {
      shape: {
        statistic: ShuttleDemandStatisticsReadModelSchema,
      },
    },
  );
  return res.statistic;
};

export const useGetAllEventDemandStats = (eventId: string) =>
  useQuery({
    queryKey: ['demand', 'stats', eventId],
    queryFn: () => getAllEventDemandStats(eventId),
    enabled: Boolean(eventId),
  });

export const getEventDemandStats = async (
  eventId: string,
  dailyEventId: string,
  {
    provinceFullName,
    cityFullName,
  }: { provinceFullName?: string; cityFullName?: string } = {},
) => {
  const searchParams = toSearchParams({ provinceFullName, cityFullName });
  const res = await instance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/demands/all/stats?${searchParams.toString()}`,
    {
      shape: {
        statistic: ShuttleDemandStatisticsReadModelSchema,
      },
    },
  );
  return res.statistic;
};

export const useGetEventDemandStats = (
  eventId: string,
  dailyEventId: string,
  params?: {
    provinceFullName?: string;
    cityFullName?: string;
  },
) =>
  useQuery({
    queryKey: ['demand', 'stats', eventId, dailyEventId, params],
    queryFn: () => getEventDemandStats(eventId, dailyEventId, params),
    enabled: Boolean(eventId && dailyEventId),
  });

// ----- POST -----

export const postDemand = async (
  eventId: string,
  dailyEventId: string,
  body: CreateShuttleDemandRequest,
) => {
  return await authInstance.post(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/demands`,
    silentParse(CreateShuttleDemandRequestSchema, body),
  );
};

export const usePostDemand = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      dailyEventId,
      body,
    }: {
      eventId: string;
      dailyEventId: string;
      body: CreateShuttleDemandRequest;
    }) => postDemand(eventId, dailyEventId, body),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user', 'demand'] }),
        queryClient.invalidateQueries({
          queryKey: ['demand'],
        }),
      ]);
      toast.success('셔틀이 개설되면 마이페이지에서 확인해보실 수 있어요.');
      onSuccess?.();
    },
    onError: (e) => {
      const error = e as CustomError;
      if (error.statusCode === 409) {
        toast.error('이미 참여한 수요조사예요.');
        return;
      }
      toast.error('수요조사에 참여하지 못했어요.');
    },
  });
};

export const deleteDemand = async ({
  eventId,
  dailyEventId,
  shuttleDemandId,
}: {
  eventId: string;
  dailyEventId: string;
  shuttleDemandId: string;
}) => {
  await authInstance.delete(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/demands/${shuttleDemandId}`,
  );
};

export const useDeleteDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDemand,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'demand'] });
      toast.success('수요조사 참여를 취소했어요.');
    },
    onError: () => {
      toast.error('수요조사를 취소하지 못했어요.');
    },
  });
};
