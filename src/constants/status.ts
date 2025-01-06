import { RouteStatusType, ShuttleStatusType } from '@/types/shuttle.types';

export const ROUTE_STATUS_TO_STRING: Record<RouteStatusType, string> = {
  OPEN: '예약 모집 중',
  CLOSED: '예약 마감',
  CONFIRMED: '예약 마감',
  ENDED: '운행 종료',
  CANCELLED: '무산',
  INACTIVE: '비활성',
};

export const SHUTTLE_STATUS_TO_STRING: Record<ShuttleStatusType, string> = {
  OPEN: '수요 확인 중',
  CLOSED: '수요조사 마감',
  ENDED: '수요조사 마감',
  INACTIVE: '비활성',
};
