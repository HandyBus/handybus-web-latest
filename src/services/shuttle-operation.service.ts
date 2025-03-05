import {
  ShuttleDemandStatisticsReadModelSchema,
  CreateShuttleDemandRequest,
  CreateShuttleDemandRequestSchema,
} from '@/types/demand.type';
import {
  ReviewsViewEntitySchema,
  CreateReviewRequestSchema,
  CreateReviewRequest,
} from '@/types/review.type';
import { ShuttleBusesViewEntitySchema } from '@/types/shuttleBus.type';
import {
  ShuttleRoutesViewEntitySchema,
  ShuttleRouteStatus,
} from '@/types/shuttleRoute.type';
import { EventStatus } from '@/types/event.type';
import { EventsViewEntitySchema } from '@/types/event.type';
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
import { ArtistsViewEntitySchema } from '@/types/artist.type';

// ----- Event -----

export const getEvents = async (status?: EventStatus) => {
  const searchParams = new URLSearchParams();
  if (status) {
    searchParams.set('status', status);
  }
  const res = await instance.get(
    `/v2/shuttle-operation/events?${searchParams.toString()}`,
    {
      shape: withPagination({
        events: EventsViewEntitySchema.array(),
      }),
    },
  );
  return res.events;
};

// TODO 추후에 pagination으로 변경
export const useGetEvents = (status?: EventStatus) =>
  useQuery({
    queryKey: ['event', status],
    queryFn: () => getEvents(status),
  });

export const getEvent = async (eventId: string) => {
  const res = await instance.get(`/v2/shuttle-operation/events/${eventId}`, {
    shape: {
      event: EventsViewEntitySchema,
    },
  });
  return res.event;
};

export const useGetEvent = (eventId: string) =>
  useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId),
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
      shape: withPagination({
        shuttleRoutes: ShuttleRoutesViewEntitySchema.array(),
      }),
    },
  );
  return res.shuttleRoutes;
};

// TODO 추후에 pagination으로 변경
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
  eventId: string,
  dailyEventId: string,
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
      shape: withPagination({
        shuttleRoutes: ShuttleRoutesViewEntitySchema.array(),
      }),
    },
  );
  return res.shuttleRoutes;
};

// TODO 추후에 pagination으로 변경
export const useGetShuttleRoutesOfDailyEvent = (
  eventId: string,
  dailyEventId: string,
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
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
) => {
  const res = await instance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}`,
    {
      shape: {
        shuttleRoute: ShuttleRoutesViewEntitySchema,
      },
    },
  );
  return res.shuttleRoute;
};

export const useGetShuttleRoute = (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
) =>
  useQuery({
    queryKey: ['shuttle-route', eventId, dailyEventId, shuttleRouteId],
    queryFn: () => getShuttleRoute(eventId, dailyEventId, shuttleRouteId),
  });

// ----- Shuttle Bus -----

export const getShuttleBus = async (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
  shuttleBusId: string,
) => {
  const res = await authInstance.get(
    `/v2/shuttle-operation/events/${eventId}/dates/${dailyEventId}/routes/${shuttleRouteId}/buses/${shuttleBusId}`,
    {
      shape: {
        shuttleBus: ShuttleBusesViewEntitySchema.nullable(),
      },
    },
  );
  return res.shuttleBus;
};

export const useGetShuttleBus = (
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
  shuttleBusId: string,
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
  eventId: string,
  dailyEventId: string,
  shuttleRouteId: string,
  shuttleBusId: string,
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
  reservationId: string,
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
      eventId: string;
      dailyEventId: string;
      shuttleRouteId: string;
      shuttleBusId: string;
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
      artists: ArtistsViewEntitySchema.array(),
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

interface GetReviewsWithPaginationOptions {
  revalidate?: number;
  limit: number;
  page?: string;
  eventId?: string;
  userId?: string;
}

export const getReviewsWithPagination = async ({
  limit = DEFAULT_PAGINATION_LIMIT,
  page,
  eventId,
  userId,
  revalidate,
}: Partial<GetReviewsWithPaginationOptions> = {}) => {
  const searchParams = toSearchParams({ limit, page, eventId, userId });
  const res = await instance.get(
    `/v2/shuttle-operation/reviews?${searchParams.toString()}`,
    {
      next: { revalidate },
      shape: withPagination({ reviews: ReviewsViewEntitySchema.array() }),
    },
  );
  return res;
};

export const useGetReviewsWithPagination = (
  options?: Partial<GetReviewsWithPaginationOptions>,
) =>
  useInfiniteQuery({
    queryKey: ['review', options],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getReviewsWithPagination({ page: pageParam, ...options }),
    initialPageParam: undefined,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => ({
      reviews: (data.pages ?? []).flatMap((page) => page.reviews),
      totalCount: data.pages?.[0]?.totalCount ?? 0,
    }),
  });

export const postReview = async (body: CreateReviewRequest) => {
  return await authInstance.post(
    '/v2/shuttle-operation/reviews',
    silentParse(CreateReviewRequestSchema, body),
  );
};

export const usePostReview = ({
  onSuccess,
  onSettled,
}: {
  onSuccess?: () => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'review'] });
      toast.success('후기가 등록되었습니다!');
      onSuccess?.();
    },
    onError: () => {
      toast.error('후기 등록에 실패하였습니다.');
    },
    onSettled: onSettled,
  });
};

// ----- Demand -----

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
      toast.success('수요조사를 취소했습니다.');
    },
    onError: () => {
      toast.error('수요조사 취소에 실패했습니다.');
    },
  });
};

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

// ----- Reservation -----

const postUpdateReservation = async (
  reservationId: string,
  body?: {
    toDestinationShuttleRouteHubId?: string;
    fromDestinationShuttleRouteHubId?: string;
    isSupportingHandy?: boolean;
  },
) => {
  return await authInstance.put(
    `/v1/shuttle-operation/reservations/${reservationId}`,
    body,
  );
};

export const usePostUpdateReservation = (
  reservationId: string,
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
      toDestinationShuttleRouteHubId?: string;
      fromDestinationShuttleRouteHubId?: string;
      isSupportingHandy?: boolean;
    }) => postUpdateReservation(reservationId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'reservation', reservationId],
      });
      toast.success('탑승지 변경이 완료되었습니다.');
      onSuccess?.();
    },
    onError: (e) => {
      const error = e as CustomError;
      toast.error('탑승지 변경에 실패했습니다.');
      onError?.(error);
    },
  });
};
