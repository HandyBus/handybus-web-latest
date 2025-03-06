import {
  ShuttleRouteStatus,
  ShuttleRoutesViewEntitySchema,
} from '@/types/shuttleRoute.type';
import { toSearchParams } from '@/utils/searchParams.util';
import { instance } from './config';
import { withPagination } from '@/types/common.type';
import { useQuery } from '@tanstack/react-query';

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
