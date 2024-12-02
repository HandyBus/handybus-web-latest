export const ROUTE_TYPE = {
  DEPARTURE: 'departure',
  RETURN: 'return',
} as const;

export type RouteType = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];

export type ShuttleRouteObject = {
  time: string;
  location: string;
  is_pickup?: boolean;
  is_dropoff?: boolean;
};

export const SECTION = {
  SHUTTLE_DETAIL: 'SHUTTLE-DETAIL',
  RESERVATION_DETAIL: 'RESERVATION-DETAIL',
  MY_RESERVATION: 'MY-RESERVATION',
} as const;

export type SectionType = (typeof SECTION)[keyof typeof SECTION];
export interface ShuttleRoute {
  shuttleRouteID: number;
  dailyShuttleID: number;
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
    regionID: number;
    arrivalTime: string;
  }[];

  dropoff: {
    name: string;
    sequence: number;
    regionID: number;
    arrivalTime: string;
  }[];

  destination: {
    name: string;
    sequence: number;
    regionID: number;
    arrivalTime: string;
  };
}

export interface ShuttleRouteEvent {
  name: string;
  dailyShuttles: {
    name: string;
    longitude: number;
    latitude: number;
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
  id: number;
  date: string;
  status: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE';
}
