export const ROUTE_TYPE = {
  DEPARTURE: 'departure',
  RETURN: 'return',
} as const;

export type RouteType = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];

export type ShuttleRouteObject = {
  time: string;
  hubId: string;
  hubName: string;
  isPickup?: boolean;
  isDropoff?: boolean;
};

export const SECTION = {
  SHUTTLE_DETAIL: 'SHUTTLE-DETAIL',
  RESERVATION_DETAIL: 'RESERVATION-DETAIL',
  MY_RESERVATION: 'MY-RESERVATION',
} as const;

export type SectionType = (typeof SECTION)[keyof typeof SECTION];
export interface ShuttleRoute {
  shuttleRouteId: number;
  dailyShuttleId: number;
  shuttle: ShuttleRouteEvent;
  name: string;
  status: 'OPEN' | 'CLOSED' | 'CONFIRMED' | 'ENDED' | 'CANCELLED' | 'INACTIVE';
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
  remainingSeatType: 'TO_DESTINATION' | 'FROM_DESTINATION' | 'ROUND_TRIP';
  hubs: Hub;
}

export interface Hub {
  pickup: {
    name: string;
    sequence: number;
    regionId: number;
    arrivalTime: string;
  }[];

  dropoff: {
    name: string;
    sequence: number;
    regionId: number;
    arrivalTime: string;
  }[];

  destination: {
    name: string;
    sequence: number;
    regionId: number;
    arrivalTime: string;
  };
}

export interface ShuttleRouteEvent {
  name: string;
  dailyShuttles: {
    dailyShuttleId: number;
    date: string;
    status: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE';
  }[];
  image: string;
  status: 'OPEN' | 'ENDED' | 'INACTIVE';
  destination: {
    name: string;
    longitude: number;
    latitude: number;
  };
  type: 'CONCERT' | 'FESTIVAL';
  participants: {
    name: string;
    longitude: number;
    latitude: number;
  }[];
}

export interface DailyShuttleDetailProps {
  dailyShuttleId: number;
  date: string;
  status: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE';
}

export const SHUTTLE_DEMANDS_STATUS = {
  OPEN: 'OPEN', // 수요조사가 아직 모집 중인 상태
  CLOSED: 'CLOSED', // 수요조사 모집 종료, 셔틀 미매핑 상태
  SHUTTLE_ASSIGNED: 'SHUTTLE_ASSIGNED', // 수요조사 모집 종료, 셔틀 매핑 상태
  ENDED: 'ENDED', // 콘서트가 끝나 셔틀 운행 종료
  CANCELLED: 'CANCELLED', // 무산 상태
  INACTIVE: 'INACTIVE', // 비활성 상태
} as const;

export type ShuttleDemandsStatusType =
  (typeof SHUTTLE_DEMANDS_STATUS)[keyof typeof SHUTTLE_DEMANDS_STATUS];

export interface ShuttleDemandStatusCount {
  fromDestinationCount: number;
  roundTripCount: number;
  toDestinationCount: number;
}

export interface ShuttleDemandStatus {
  count: ShuttleDemandStatusCount;
}

export interface RegionHubProps {
  regionHubs: {
    regionHubId: number;
    regionId: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }[];
}
