import { ROUTE_TYPE } from '@/types/shuttle.types';
import { RouteType } from '@/types/shuttle.types';
import { HubType } from '@/types/hub.type';
export const isShuttleRouteLocationBlurred = ({
  object,
  type,
  index,
  length,
}: {
  object: HubType;
  type: RouteType;
  index: number;
  length: number;
}) => {
  if (type === ROUTE_TYPE.DEPARTURE)
    return !(index === length - 1 || object?.selected);
  if (type === ROUTE_TYPE.RETURN) return !(index === 0 || object?.selected);
  return false;
};
