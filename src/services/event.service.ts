import { useQuery } from '@tanstack/react-query';
import {
  EventStatus,
  EventWithRoutesViewEntitySchema,
} from '@/types/event.type';
import { instance } from './config';
import { Combinations, withPagination } from '@/types/common.type';
import { toSearchParams } from '@/utils/searchParams.util';

export const getEvents = async (params?: {
  status?: Combinations<EventStatus>;
  eventIsPinned?: boolean;
  orderBy?: 'eventName' | 'eventRecommendationScore';
  additionalOrderOptions?: 'ASC' | 'DESC';
}) => {
  const searchParams = toSearchParams(params);
  const res = await instance.get(
    `/v3/shuttle-operation/events?${searchParams.toString()}`,
    {
      shape: withPagination({
        events: EventWithRoutesViewEntitySchema.array(),
      }),
    },
  );
  return res.events;
};

export const useGetEvents = (params?: {
  status?: Combinations<EventStatus>;
  eventIsPinned?: boolean;
  orderBy?: 'eventName' | 'eventRecommendationScore';
  additionalOrderOptions?: 'ASC' | 'DESC';
}) =>
  useQuery({
    queryKey: ['event', params],
    queryFn: () => getEvents(params),
  });

export const getEvent = async (eventId: string) => {
  const res = await instance.get(`/v3/shuttle-operation/events/${eventId}`, {
    shape: {
      event: EventWithRoutesViewEntitySchema,
    },
  });
  return res.event;
};

export const useGetEvent = (
  eventId: string,
  { enabled }: { enabled?: boolean } = { enabled: true },
) =>
  useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId),
    enabled,
  });
