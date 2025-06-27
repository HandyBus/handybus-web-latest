import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

// TODO: 임시로 핸디팟 노선 처리

export const TAXI_HUB_PREFIX = process.env.NEXT_PUBLIC_TAXI_HUB_NAME;

export const getIsTaxiRoute = (
  route: ShuttleRoutesViewEntity | null | undefined,
) => {
  if (!TAXI_HUB_PREFIX || !route) {
    return false;
  }

  return !!(
    route.toDestinationShuttleRouteHubs?.some((hub) =>
      hub.name.startsWith(TAXI_HUB_PREFIX),
    ) ||
    route.fromDestinationShuttleRouteHubs?.some((hub) =>
      hub.name.startsWith(TAXI_HUB_PREFIX),
    )
  );
};
