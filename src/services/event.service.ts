import { useQuery } from '@tanstack/react-query';
import {
  EventStatus,
  EventWithRoutesViewEntitySchema,
} from '@/types/event.type';
import { EventsViewEntitySchema } from '@/types/event.type';
import { instance } from './config';
import { withPagination } from '@/types/common.type';

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
  const res = await instance.get(`/v3/shuttle-operation/events/${eventId}`, {
    shape: {
      event: EventWithRoutesViewEntitySchema,
    },
  });
  return res.event;
};

export const useGetEvent = (eventId: string) =>
  useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId),
  });
