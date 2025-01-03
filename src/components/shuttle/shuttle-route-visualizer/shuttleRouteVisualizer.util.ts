import { ROUTE_TYPE, ShuttleRouteHubObject } from '@/types/shuttle.types';
import { RouteType } from '@/types/shuttle.types';

export const isShuttleRouteLocationBlurred = ({
  object,
  type,
  index,
  length,
}: {
  object: ShuttleRouteHubObject;
  type: RouteType;
  index: number;
  length: number;
}) => {
  if (type === ROUTE_TYPE.DEPARTURE)
    return !(index === length - 1 || object.selected);
  if (type === ROUTE_TYPE.RETURN) return !(index === 0 || object.selected);
  return false;
};
