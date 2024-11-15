export const ROUTE_TYPE = {
  DEPARTURE: 'departure',
  RETURN: 'return',
} as const;

export type RouteType = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];

export type ShuttleRouteObject = {
  time: string;
  location: string;
};
