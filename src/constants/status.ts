import { EventType } from '@/types/event.type';
import { TripType } from '@/types/shuttleRoute.type';

export const TRIP_STATUS_TO_STRING: Record<TripType, string> = {
  TO_DESTINATION: '가는 편',
  FROM_DESTINATION: '오는 편',
  ROUND_TRIP: '왕복',
} as const;

export const EVENT_TYPE_TO_STRING: Record<EventType, string> = {
  CONCERT: '콘서트',
  FESTIVAL: '페스티벌',
  SPORTS: '스포츠',
} as const;
