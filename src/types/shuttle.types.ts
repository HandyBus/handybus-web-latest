import { HubsType } from './hub.type';

export const ROUTE_TYPE = {
  DEPARTURE: 'departure',
  RETURN: 'return',
} as const;

export type RouteType = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];

export const SECTION = {
  SHUTTLE_DETAIL: 'SHUTTLE-DETAIL',
  RESERVATION_DETAIL: 'RESERVATION-DETAIL',
  MY_RESERVATION: 'MY-RESERVATION',
} as const;

export type SectionType = (typeof SECTION)[keyof typeof SECTION];

// ----------------

export type ShuttleStatusType =
  | 'OPEN' // 셔틀 열린 상태
  | 'CLOSED' // 셔틀의 모든 일자에 대한 수요조사 모집 종료 (dailyShuttle의 경우에는 해당 일자의 수요조사 모집 종료)
  | 'ENDED' // 셔틀 종료됨
  | 'INACTIVE';

export type RouteStatusType =
  | 'OPEN' // 예약모집중
  | 'CLOSED' // 예약마감
  | 'CONFIRMED' // 배차가 완료되고 모든 정보가 확정된 상태
  | 'ENDED' // 운행종료
  | 'CANCELLED' // 무산
  | 'INACTIVE'; // 비활성

export type TripType = 'TO_DESTINATION' | 'FROM_DESTINATION' | 'ROUND_TRIP';

export interface ShuttleType {
  shuttleId: number;
  dailyShuttles: DailyShuttleType[];
  name: string;
  image: string;
  status: ShuttleStatusType;
  destination: {
    name: string;
    longitude: number;
    latitude: number;
  };
  type: 'CONCERT' | 'FESTIVAL';
  participants: {
    name: string;
  }[];
}

export type ShuttleWithDemandCountType = ShuttleType & {
  totalDemandCount: number;
};

export interface DailyShuttleType {
  dailyShuttleId: number;
  date: string;
  status: ShuttleStatusType;
}

export interface ShuttleRouteType {
  shuttleId: number;
  shuttleRouteId: number;
  dailyShuttleId: number;
  shuttle: ShuttleType;
  name: string;
  status: RouteStatusType;
  hasEarlyBird: boolean;
  earlybirdDeadline: string;
  reservationDeadline: string;
  earlybirdPriceToDestination: number;
  earlybirdPriceFromDestination: number;
  earlybirdPriceRoundTrip: number;
  regularPriceToDestination: number;
  regularPriceFromDestination: number;
  regularPriceRoundTrip: number;
  maxPassengerCount: number;
  remainingSeatCount: number;
  remainingSeatType: TripType;
  hubs: HubsType;
}
