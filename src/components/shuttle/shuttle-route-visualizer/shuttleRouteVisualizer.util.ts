import { ROUTE_TYPE, ShuttleRouteObject } from '@/types/shuttle.types';
import { RouteType } from '@/types/shuttle.types';

export const isShuttleRouteLocationBlurred = ({
  object,
  type,
  index,
  length,
}: {
  object: ShuttleRouteObject;
  type: RouteType;
  index: number;
  length: number;
}) => {
  if (type === ROUTE_TYPE.DEPARTURE)
    return !(index === length - 1 || object.isPickup);
  if (type === ROUTE_TYPE.RETURN) return !(index === 0 || object.isDropoff);
  return false;
};
