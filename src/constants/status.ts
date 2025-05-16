import { ShuttleRouteStatus, TripType } from '@/types/shuttleRoute.type';
import {
  CancelStatus,
  HandyStatus,
  ReservationStatus,
} from '@/types/reservation.type';
import { EventStatus, EventType } from '@/types/event.type';
import { EventSortType } from '../app/event/event.const';

export const EVENT_STATUS_TO_STRING: Record<EventStatus, string> = {
  OPEN: '수요 확인 중',
  CLOSED: '수요조사 마감',
  ENDED: '수요조사 마감',
  INACTIVE: '비활성',
} as const;

export const SHUTTLE_ROUTE_STATUS_TO_STRING: Record<
  ShuttleRouteStatus,
  string
> = {
  OPEN: '예약 모집 중',
  CLOSED: '예약 마감',
  ENDED: '운행 종료',
  CANCELLED: '무산',
  INACTIVE: '비활성',
} as const;

export const TRIP_STATUS_TO_STRING: Record<TripType, string> = {
  TO_DESTINATION: '가는 편',
  FROM_DESTINATION: '오는 편',
  ROUND_TRIP: '왕복',
} as const;

export const HANDY_STATUS_TO_STRING: Record<HandyStatus, string> = {
  SUPPORTED: '핸디 심사 진행 중',
  ACCEPTED: '핸디 선정',
  DECLINED: '핸디 미선정',
  NOT_SUPPORTED: '',
} as const;

export const CANCEL_STATUS_TO_STRING: Record<CancelStatus, string> = {
  CANCEL_REQUEST: '환불 진행 중',
  CANCEL_COMPLETE: '환불 완료',
  NONE: '',
} as const;

export const RESERVATION_STATUS_TO_STRING: Record<ReservationStatus, string> = {
  COMPLETE_PAYMENT: '결제 완료',
  NOT_PAYMENT: '결제 미완료',
  CANCEL: '예약 취소',
} as const;

export const EVENT_TYPE_TO_STRING: Record<EventType, string> = {
  CONCERT: '콘서트',
  FESTIVAL: '페스티벌',
} as const;

export const EVENT_SORT_TYPE_TO_STRING: Record<EventSortType, string> = {
  DATE_ASC: '행사 임박순',
  NAME_ASC: '이름순',
} as const;
