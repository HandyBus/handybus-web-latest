import {
  ArtistSchema,
  EventDemandStatsSchema,
  EventSchema,
  EventStatus,
  PostDemandBody,
  PostDemandBodySchema,
  PostReviewBody,
  PostReviewBodySchema,
  ReviewSchema,
  ShuttleBusSchema,
  ShuttleRouteSchema,
  ShuttleRouteStatus,
} from '@/types/shuttle-operation.type';
import { authInstance, instance } from './config';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toSearchParams } from '@/utils/searchParams.util';
import { DEFAULT_PAGINATION_LIMIT } from '@/constants/common';
import { withPagination } from '@/types/common.type';
import { toast } from 'react-toastify';
import { CustomError } from './custom-error';
import { silentParse } from '@/utils/config.util';

// ----- Event -----

export const getEvents = async (status?: EventStatus) => {
  const searchParams = new URLSearchParams();
  if (status) {
    searchParams.set('status', status);
  }
  const res = await instance.get(
    `/v2/shuttle-operation/events?${searchParams.toString()}`,
    {
      shape: {
        events: EventSchema.array(),
      },
    },
  );
  return res.events;
};

export const useGetEvents = (status?: EventStatus) =>
  useQuery({
    queryKey: ['event', status],
    queryFn: () => getEvents(status),
  });

export const getEvent = async (id: number) => {
  const res = await instance.get(`/v2/shuttle-operation/events/${id}`, {
    shape: {
      event: EventSchema,
    },
  });
  return res.event;
};

export const useGetEvent = (id: number) =>
  useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
  });

// ----- Shuttle Route -----

export const getShuttleRoutes = async (params?: {
  provinceFullName?: string;
  cityFullName?: string;
  status?: ShuttleRouteStatus;
}) => {
  const searchParams = toSearchParams(params);
  const res = await instance.get(
    `/v2/shuttle-operation/events/all/dates/all/routes?${searchParams.toString()}`,
    {
      shape: {
        shuttleRoutes: ShuttleRouteSchema.array(),
      },
    },
  );
  return res.shuttleRoutes;
};

export const useGetShuttleRoutes = (params?: {
  provinceFullName?: string;
  cityFullName?: string;
  status?: ShuttleRouteStatus;
}) =>
  useQuery({
    queryKey: ['shuttle-route', params],
    queryFn: () => getShuttleRoutes(params),
  });

export const getShuttleRoutesOfDailyEvent = async (
  eventId: number,
  dailyEventId: number,
  params?: {
    provinceFullName?: string;
    cityFullName?: string;
    status?: ShuttleRouteStatus;
  },
) => {
  const searchParams = toSearchParams(params);
  const res = await instance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes?${searchParams.toString()}`,
    {
      shape: {
        shuttleRoutes: ShuttleRouteSchema.array(),
      },
    },
  );
  return res.shuttleRoutes;
};

export const useGetShuttleRoutesOfDailyEvent = (
  eventId: number,
  dailyEventId: number,
  params?: {
    provinceFullName?: string;
    cityFullName?: string;
    status?: ShuttleRouteStatus;
  },
) =>
  useQuery({
    queryKey: ['shuttle-route', eventId, dailyEventId, params],
    queryFn: () => getShuttleRoutesOfDailyEvent(eventId, dailyEventId, params),
  });

export const getShuttleRoute = async (
  eventId: number,
  dailyEventId: number,
  shuttleRouteId: number,
) => {
  const res = await instance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}`,
    {
      shape: {
        shuttleRoute: ShuttleRouteSchema,
      },
    },
  );
  return res.shuttleRoute;
};

export const useGetShuttleRoute = (
  eventId: number,
  dailyEventId: number,
  shuttleRouteId: number,
) =>
  useQuery({
    queryKey: ['shuttle-route', eventId, dailyEventId, shuttleRouteId],
    queryFn: () => getShuttleRoute(eventId, dailyEventId, shuttleRouteId),
  });

// ----- Shuttle Bus -----

export const getShuttleBus = async (
  eventId: number,
  dailyEventId: number,
  shuttleRouteId: number,
  shuttleBusId: number,
) => {
  const res = await authInstance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/buses/${shuttleBusId}`,
    {
      shape: {
        shuttleBus: ShuttleBusSchema.nullable(),
      },
    },
  );
  return res.shuttleBus;
};

export const useGetShuttleBus = (
  eventId: number,
  dailyEventId: number,
  shuttleRouteId: number,
  shuttleBusId: number,
) =>
  useQuery({
    queryKey: [
      'user',
      'shuttle-bus',
      eventId,
      dailyEventId,
      shuttleRouteId,
      shuttleBusId,
    ],
    queryFn: () =>
      getShuttleBus(eventId, dailyEventId, shuttleRouteId, shuttleBusId),
    enabled: !!eventId && !!dailyEventId && !!shuttleRouteId && !!shuttleBusId,
  });

const putShuttleBus = async (
  eventId: number,
  dailyEventId: number,
  shuttleRouteId: number,
  shuttleBusId: number,
  {
    openChatLink,
  }: {
    openChatLink: string;
  },
) => {
  return await authInstance.put(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/buses/${shuttleBusId}`,
    { openChatLink },
  );
};

export const usePutShuttleBus = (
  reservationId: number,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: CustomError) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      dailyEventId,
      shuttleRouteId,
      shuttleBusId,
      openChatLink,
    }: {
      eventId: number;
      dailyEventId: number;
      shuttleRouteId: number;
      shuttleBusId: number;
      openChatLink: string;
    }) =>
      putShuttleBus(eventId, dailyEventId, shuttleRouteId, shuttleBusId, {
        openChatLink,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation', reservationId],
      });
      onSuccess?.();
    },
    onError,
  });
};

// ----- Artist -----

export const getArtists = async () => {
  const res = await instance.get('/v2/shuttle-operation/artists', {
    shape: {
      artists: ArtistSchema.array(),
    },
  });
  return res.artists;
};

export const useGetArtists = () =>
  useQuery({
    queryKey: ['artists'],
    queryFn: getArtists,
  });

// ----- Review -----

export const getReviewsWithPagination = async ({
  limit = DEFAULT_PAGINATION_LIMIT,
  page,
  eventId,
  userId,
}: {
  limit?: number;
  page?: number;
  eventId?: number;
  userId?: number;
} = {}) => {
  const searchParams = toSearchParams({ limit, page, eventId, userId });
  const res = await instance.get(
    `/v2/shuttle-operation/reviews?${searchParams.toString()}`,
    {
      shape: withPagination({ reviews: ReviewSchema.array() }),
    },
  );
  return res;
};

export const useGetReviewsWithPagination = () =>
  useInfiniteQuery({
    queryKey: ['review'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getReviewsWithPagination({ page: pageParam }),
    initialPageParam: 0,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => ({
      reviews: (data.pages ?? []).flatMap((page) => page.reviews),
      totalCount: data.pages?.[0]?.totalCount ?? 0,
    }),
  });

export const postReview = async (body: PostReviewBody) => {
  return await authInstance.post(
    '/v2/shuttle-operation/reviews',
    silentParse(PostReviewBodySchema, body),
  );
};

export const usePostReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'review'] });
      toast.success('후기가 등록되었습니다!');
    },
    onError: () => {
      toast.error('후기 등록에 실패하였습니다.');
    },
  });
};

// ----- Demand -----

export const postDemand = async (
  eventId: number,
  dailyEventId: number,
  body: PostDemandBody,
) => {
  return await authInstance.post(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/demands`,
    silentParse(PostDemandBodySchema, body),
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
      eventId: number;
      dailyEventId: number;
      body: PostDemandBody;
    }) => postDemand(eventId, dailyEventId, body),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user', 'demand'] }),
        queryClient.invalidateQueries({
          queryKey: ['demand'],
        }),
      ]);
      toast.success(
        '해당 셔틀이 개설되면 마이페이지에서 확인해보실 수 있어요!',
      );
      onSuccess?.();
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

export const deleteDemand = async ({
  eventId,
  dailyEventId,
  shuttleDemandId,
}: {
  eventId: number;
  dailyEventId: number;
  shuttleDemandId: number;
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
      toast.success('수요조사를 취소했습니다.');
    },
    onError: () => {
      toast.error('수요조사 취소에 실패했습니다.');
    },
  });
};

export const getEventDemandStats = async (
  eventId: number,
  dailyEventId: number,
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
        statistic: EventDemandStatsSchema,
      },
    },
  );
  return res.statistic;
};

export const useGetEventDemandStats = (
  eventId: number,
  dailyEventId: number,
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

// ----- Reservation -----

const postUpdateReservation = async (
  reservationId: number,
  body?: {
    toDestinationShuttleRouteHubId?: number;
    fromDestinationShuttleRouteHubId?: number;
    isSupportingHandy?: boolean;
  },
) => {
  return await authInstance.put(
    `/v1/shuttle-operation/reservations/${reservationId}`,
    body,
  );
};

export const usePostUpdateReservation = (
  reservationId: number,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (e: CustomError) => void;
  },
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body?: {
      toDestinationShuttleRouteHubId?: number;
      fromDestinationShuttleRouteHubId?: number;
      isSupportingHandy?: boolean;
    }) => postUpdateReservation(reservationId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation', reservationId],
      });
      onSuccess?.();
    },
    onError,
  });
};
