import { withPagination } from '@/types/common.type';
import { PaginationParams } from '@/types/common.type';
import { authInstance } from './config';
import { toSearchParams } from '@/utils/searchParams.util';
import {
  CreateShuttleRouteAlertRequestResponseSchema,
  ShuttleRouteAlertRequestsViewEntitySchema,
} from '@/types/alertRequest.type';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// ----- GET -----

export const getUserAlertRequests = async (
  params?: PaginationParams<unknown>,
) => {
  const searchParams = toSearchParams(params);
  const res = await authInstance.get(
    `/v1/user-management/users/me/alert-requests?${searchParams.toString()}`,
    {
      shape: withPagination({
        shuttleRouteAlertRequests:
          ShuttleRouteAlertRequestsViewEntitySchema.array(),
      }),
    },
  );
  return res;
};

export const useGetUserAlertRequestsWithPagination = (
  params?: PaginationParams<unknown>,
) =>
  useInfiniteQuery({
    queryKey: ['user', 'alert-request', params],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getUserAlertRequests({ ...params, page: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

export const getUserAlertRequest = async (
  shuttleRouteAlertRequestId: string,
) => {
  const res = await authInstance.get(
    `/v1/user-management/users/me/alert-requests/${shuttleRouteAlertRequestId}`,
    {
      shape: {
        shuttleRouteAlertRequest: ShuttleRouteAlertRequestsViewEntitySchema,
      },
    },
  );
  return res.shuttleRouteAlertRequest;
};

export const useGetUserAlertRequest = (shuttleRouteAlertRequestId: string) => {
  return useQuery({
    queryKey: ['user', 'alert-request', shuttleRouteAlertRequestId],
    queryFn: () => getUserAlertRequest(shuttleRouteAlertRequestId),
  });
};

// ----- POST -----

export const postAlertRequest = async (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
) => {
  const res = await authInstance.post(
    `/v1/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/alert-requests`,
    {},
    {
      shape: {
        shuttleRouteAlertRequest: CreateShuttleRouteAlertRequestResponseSchema,
      },
    },
  );
  return res;
};

export const usePostAlertRequest = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      dailyEventId,
      shuttleRouteId,
    }: {
      eventId: string;
      dailyEventId: string;
      shuttleRouteId: string;
    }) => postAlertRequest(eventId, dailyEventId, shuttleRouteId),
  });
};

export const deleteAlertRequest = async (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
  shuttleRouteAlertRequestId: string,
) => {
  const res = await authInstance.delete(
    `/v1/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/alert-requests/${shuttleRouteAlertRequestId}`,
  );
  return res;
};

export const useDeleteAlertRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      dailyEventId,
      shuttleRouteId,
      shuttleRouteAlertRequestId,
    }: {
      eventId: string;
      dailyEventId: string;
      shuttleRouteId: string;
      shuttleRouteAlertRequestId: string;
    }) =>
      deleteAlertRequest(
        eventId,
        dailyEventId,
        shuttleRouteId,
        shuttleRouteAlertRequestId,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'alert-request'],
      });
    },
  });
};
