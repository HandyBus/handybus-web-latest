import { RouteStatusType } from '@/types/shuttle.types';

export const ROUTE_STATUS_TO_STRING: Record<RouteStatusType, string> = {
  OPEN: '예약 모집 중',
  CLOSED: '예약 마감',
  CONFIRMED: '예약 마감',
  ENDED: '운행 종료',
  CANCELLED: '무산',
  INACTIVE: '비활성',
};
