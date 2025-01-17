import {
  EventStatus,
  ShuttleRouteStatus,
  TripType,
} from '@/types/shuttle-operation.type';
import {
  CancelStatus,
  HandyStatus,
  ShuttleDemandStatus,
} from '@/types/user-management.type';

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

export const DEMAND_STATUS_TO_STRING: Record<ShuttleDemandStatus, string> = {
  OPEN: '수요 확인 중',
  CLOSED: '수요 신청 마감',
  ENDED: '운행 종료',
  CANCELLED: '무산',
  INACTIVE: '비활성',
} as const;

export const TRIP_STATUS_TO_STRING: Record<TripType, string> = {
  TO_DESTINATION: '콘서트행',
  FROM_DESTINATION: '귀가행',
  ROUND_TRIP: '왕복',
} as const;

export const HANDY_STATUS_TO_STRING: Record<HandyStatus, string> = {
  SUPPORTED: '핸디 지원',
  ACCEPTED: '핸디',
  DECLINED: '',
  NOT_SUPPORTED: '',
} as const;

export const CANCEL_STATUS_TO_STRING: Record<CancelStatus, string> = {
  CANCEL_REQUEST: '환불 진행 중',
  CANCEL_COMPLETE: '환불 완료',
  NONE: '',
} as const;
