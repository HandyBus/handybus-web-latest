export const ROUTE_TYPE = {
  DEPARTURE: 'departure',
  RETURN: 'return',
} as const;

export type RouteType = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];

export type ShuttleRouteObject = {
  time: string;
  location: string;
};

export const SECTION = {
  SHUTTLE_DETAIL: 'shuttle-detail',
  RESERVATION_DETAIL: 'reservation-detail',
  MY_RESERVATION: 'my-reservation',
} as const;

export type SectionType = (typeof SECTION)[keyof typeof SECTION];
