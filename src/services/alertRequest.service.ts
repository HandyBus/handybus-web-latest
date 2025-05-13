import { withPagination } from '@/types/common.type';
import { PaginationParams } from '@/types/common.type';
import { authInstance, instance } from './config';
import { toSearchParams } from '@/utils/searchParams.util';
import { ShuttleRouteAlertRequestsViewEntitySchema } from '@/types/alertRequest.type';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

// ----- GET -----

export const getUserAlertRequests = async (
  params: PaginationParams<unknown>,
) => {
  const searchParams = toSearchParams(params);
  const res = await instance.get(
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

// ----- POST -----

export const postAlertRequest = async (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
) => {
  const res = await authInstance.post(
    `/v1/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/alert-requests`,
    {},
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
