import {
  CreateShuttleDemandRequest,
  CreateShuttleDemandRequestSchema,
  ShuttleDemandStatisticsReadModelSchema,
  ShuttleDemandStatus,
  ShuttleDemandsViewEntitySchema,
} from '@/types/demand.type';
import { authInstance, instance } from './config';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toSearchParams } from '@/utils/searchParams.util';
import { silentParse } from '@/utils/config.util';
import { toast } from 'react-toastify';
import { CustomError } from './custom-error';
import { LONG_QUERY_STALE_TIME } from '@/constants/common';
import { PaginationParams, withPagination } from '@/types/common.type';

// ----- GET -----

export const getUserDemand = async (demandId: string) => {
  const res = await authInstance.get(
    `/v1/user-management/users/me/demands/${demandId}`,
    {
      shape: {
        shuttleDemand: ShuttleDemandsViewEntitySchema,
      },
    },
  );
  return res.shuttleDemand;
};

export const useGetUserDemand = (demandId: string) =>
  useQuery({
    queryKey: ['user', 'demand', demandId],
    queryFn: () => getUserDemand(demandId),
  });

interface GetUserDemandsParams {
  eventId?: string;
  dailyEventId?: string;
  regionId?: string;
  status?: ShuttleDemandStatus;
  hasShuttleRoute?: boolean;
  monthsAgo?: number;
}

export const getUserDemands = async (
  params: PaginationParams<GetUserDemandsParams>,
) => {
  const searchParams = toSearchParams(params);
  const res = await authInstance.get(
    `/v3/user-management/users/me/demands?${searchParams.toString()}`,
    {
      shape: withPagination({
        shuttleDemands: ShuttleDemandsViewEntitySchema.array(),
      }),
    },
  );
  return res;
};

export const useGetUserDemandsWithPagination = (
  params?: PaginationParams<GetUserDemandsParams>,
) =>
  useInfiniteQuery({
    queryKey: ['user', 'demand', params],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getUserDemands({ ...params, page: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
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
    queryKey: ['demand', 'event-stats', eventId, dailyEventId, params],
    queryFn: () => getEventDemandStats(eventId, dailyEventId, params),
    enabled: Boolean(eventId && dailyEventId),
  });

interface GetDemandStatsParams {
  groupBy:
    | 'EVENT'
    | 'DAILY_EVENT'
    | 'PROVINCE'
    | 'CITY'
    | 'TO_DESTINATION_REGION_HUB'
    | 'FROM_DESTINATION_REGION_HUB';
  provinceFullName?: string;
  provinceShortName?: string;
  cityFullName?: string;
  cityShortName?: string;
  dailyEventId?: string;
  eventId?: string;
}

export const getDemandStats = async (params: GetDemandStatsParams) => {
  const searchParams = toSearchParams(params);
  const res = await instance.get(
    `/v2/shuttle-operation/demands/all/stats?${searchParams.toString()}`,
    {
      shape: {
        statistics: ShuttleDemandStatisticsReadModelSchema.array(),
      },
    },
  );
  return res.statistics;
};

export const useGetDemandStats = (
  params: GetDemandStatsParams,
  { enabled = true }: { enabled?: boolean } = {},
) =>
  useQuery({
    queryKey: ['demand', 'stats', params],
    queryFn: () => getDemandStats(params),
    enabled,
    staleTime: LONG_QUERY_STALE_TIME,
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

export const usePostDemand = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
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
      onSuccess?.();
    },
    onError: (e) => {
      const error = e as CustomError;
      console.error(error);
      // 409일 시 이미 요청한 수요조사
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
