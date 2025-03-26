import { atomWithCache } from 'jotai-cache';
import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  ShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';
import { BigRegionsType, ID_TO_REGION } from '@/constants/regions';
import { datesWithRoutesAtom } from './datesWithRoutesAtom';

interface HubWithInfo extends ShuttleRouteHubsInShuttleRoutesViewEntity {
  shuttleRouteId: string;
  sido: BigRegionsType;
  gungu: string;
  remainingSeatType: TripType;
  remainingSeatCount: number;
}

interface DatesWithHubs {
  [date: string]: {
    [sido in BigRegionsType]: {
      [gungu: string]: HubWithInfo[][];
    };
  };
}

export const datesWithHubsAtom = atomWithCache<DatesWithHubs>((get) => {
  const datesWithRoutes = get(datesWithRoutesAtom);
  const datesWithHubs = Object.entries(datesWithRoutes).map(
    ([date, routes]) => {
      const hubsWithInfo = routes.reduce((acc, route) => {
        const newHubsWithInfo = getHubsWithInfoInRoute(route);
        return [...acc, ...newHubsWithInfo];
      }, [] as HubWithInfo[]);

      const groupedHubs = groupHubsByRegion(hubsWithInfo);

      return [date, groupedHubs];
    },
  );
  return Object.fromEntries(datesWithHubs);
});

const groupHubsByRegion = (hubsWithInfo: HubWithInfo[]) => {
  return hubsWithInfo.reduce(
    (acc, hub) => {
      if (!acc[hub.sido]) {
        acc[hub.sido] = {};
      }
      if (!acc[hub.sido][hub.gungu]) {
        acc[hub.sido][hub.gungu] = [];
      }
      const existingGroup = acc[hub.sido][hub.gungu].find(
        (group) => group?.[0]?.regionHubId === hub.regionHubId,
      );
      if (existingGroup) {
        existingGroup.push(hub);
      } else {
        acc[hub.sido][hub.gungu].push([hub]);
      }
      return acc;
    },
    {} as {
      [sido in BigRegionsType]: {
        [gungu: string]: HubWithInfo[][];
      };
    },
  );
};

const getHubsWithInfoInRoute = (
  route: ShuttleRoutesViewEntity,
): HubWithInfo[] => {
  const shuttleRouteId = route.shuttleRouteId;
  const { type: remainingSeatType, count: remainingSeatCount } =
    getRemainingSeatTypeAndCount(route);

  const toDestinationHubs = route.toDestinationShuttleRouteHubs
    ? route.toDestinationShuttleRouteHubs.slice(0, -1)
    : null;
  const fromDestinationHubs = route.fromDestinationShuttleRouteHubs
    ? route.fromDestinationShuttleRouteHubs.slice(1)
    : null;
  const hubs = (toDestinationHubs || fromDestinationHubs) ?? [];

  const hubsWithInfo = hubs.map((hub) => {
    const hubRegion = ID_TO_REGION[hub.regionId];
    return {
      ...hub,
      shuttleRouteId,
      sido: hubRegion.bigRegion,
      gungu: hubRegion.smallRegion,
      remainingSeatType,
      remainingSeatCount,
    };
  });

  return hubsWithInfo;
};

const getRemainingSeatTypeAndCount = (
  route: ShuttleRoutesViewEntity,
): {
  type: TripType;
  count: number;
} => {
  const maxSeatCount = route.maxPassengerCount ?? 0;
  const toDestinationCount = maxSeatCount - (route?.toDestinationCount ?? 0);
  const fromDestinationCount =
    maxSeatCount - (route?.fromDestinationCount ?? 0);
  const roundTripCount = Math.min(toDestinationCount, fromDestinationCount);

  if (roundTripCount > 0) {
    return { type: 'ROUND_TRIP', count: roundTripCount };
  }
  if (toDestinationCount > 0) {
    return { type: 'TO_DESTINATION', count: toDestinationCount };
  }
  return { type: 'FROM_DESTINATION', count: fromDestinationCount };
};
