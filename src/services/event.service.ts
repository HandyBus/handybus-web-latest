import { useQuery } from '@tanstack/react-query';
import { EventStatus, EventsViewEntitySchema } from '@/types/event.type';
import { instance } from './config';
import { Combinations, withPagination } from '@/types/common.type';
import { toSearchParams } from '@/utils/searchParams.util';

const EXO_FANMEETING_EVENT_ID = '638259410820405180';
const EXO_FANMEETING_DAILY_EVENT_ID = '638259410816210874';

export const getEvents = async (params?: {
  status?: Combinations<EventStatus>;
  eventIsPinned?: boolean;
  orderBy?: 'eventName' | 'eventRecommendationScore';
  additionalOrderOptions?: 'ASC' | 'DESC';
}) => {
  const searchParams = toSearchParams(params);
  const res = await instance.get(
    `/v2/shuttle-operation/events?${searchParams.toString()}`,
    {
      shape: withPagination({
        events: EventsViewEntitySchema.array(),
      }),
    },
  );

  // 엑소 팬미팅 12.13일 비활성화 임시 코드
  const filteredEvents = res.events.map((event) => {
    if (event.eventId === EXO_FANMEETING_EVENT_ID) {
      return {
        ...event,
        startDate: event.endDate,
        dailyEvents: event.dailyEvents.filter(
          (dailyEvent) =>
            dailyEvent.dailyEventId !== EXO_FANMEETING_DAILY_EVENT_ID,
        ),
      };
    }
    return event;
  });
  return filteredEvents;
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
  const res = await instance.get(`/v2/shuttle-operation/events/${eventId}`, {
    shape: {
      event: EventsViewEntitySchema,
    },
  });

  // 엑소 팬미팅 12.13일 비활성화 임시 코드
  if (eventId === EXO_FANMEETING_EVENT_ID) {
    return {
      ...res.event,
      startDate: res.event.endDate,
      dailyEvents: res.event.dailyEvents.filter(
        (dailyEvent) =>
          dailyEvent.dailyEventId !== EXO_FANMEETING_DAILY_EVENT_ID,
      ),
    };
  }

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

// OPEN,CLOSED 인 행사 중 추천 점수가 높은 순으로 행사 조회
export const getTopRecommendedEvents = async (limit?: number) => {
  const searchParams = toSearchParams({ limit });
  const res = await instance.get(
    `/v2/shuttle-operation/events/top/recommended?${searchParams.toString()}`,
    {
      shape: {
        events: EventsViewEntitySchema.array(),
      },
    },
  );
  const filteredEvents = res.events.map((event) => {
    if (event.eventId === EXO_FANMEETING_EVENT_ID) {
      return {
        ...event,
        startDate: event.endDate,
        dailyEvents: event.dailyEvents.filter(
          (dailyEvent) =>
            dailyEvent.dailyEventId !== EXO_FANMEETING_DAILY_EVENT_ID,
        ),
      };
    }
    return event;
  });
  return filteredEvents;
};

export const useGetTopRecommendedEvents = (limit?: number) =>
  useQuery({
    queryKey: ['event', 'top', 'recommended', limit],
    queryFn: () => getTopRecommendedEvents(limit),
  });
