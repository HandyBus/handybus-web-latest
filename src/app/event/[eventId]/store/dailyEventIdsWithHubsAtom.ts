import { atomWithCache } from 'jotai-cache';
import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  ShuttleRoutesViewEntity,
} from '@/types/shuttleRoute.type';
import { BigRegionsType, ID_TO_REGION } from '@/constants/regions';
import {
  DailyEventIdsWithRoutes,
  dailyEventIdsWithRoutesAtom,
} from './dailyEventIdsWithRoutesAtom';
import { getRemainingSeat, RemainingSeat } from '@/utils/event.util';

export interface HubWithInfo extends ShuttleRouteHubsInShuttleRoutesViewEntity {
  shuttleRouteId: string;
  sido: BigRegionsType;
  gungu: string;
  remainingSeat: RemainingSeat;
}

interface DailyEventIdsWithHubs {
  [dailyEventId: string]: {
    [sido in BigRegionsType]: {
      [gungu: string]: HubWithInfo[][];
    };
  };
}

export const dailyEventIdsWithHubsAtom = atomWithCache<DailyEventIdsWithHubs>(
  (get) => {
    const dailyEventIdsWithRoutes = get(dailyEventIdsWithRoutesAtom);
    const dailyEventIdsWithHubs = Object.entries(dailyEventIdsWithRoutes).map(
      ([dailyEventId, routes]) => {
        const hubsWithInfo = routes.reduce((acc, route) => {
          const newHubsWithInfo = getHubsWithInfoInRoute(route);
          return [...acc, ...newHubsWithInfo];
        }, [] as HubWithInfo[]);

        const groupedHubs = groupHubsByRegion(hubsWithInfo);
        return [dailyEventId, groupedHubs];
      },
    );
    return Object.fromEntries(dailyEventIdsWithHubs);
  },
);

export const groupHubsByRegion = <
  T extends { sido: BigRegionsType; gungu: string; regionHubId: string },
>(
  hubsWithInfo: T[],
) => {
  return hubsWithInfo.reduce(
    (acc, hub) => {
      if (!acc?.[hub.sido]) {
        acc[hub.sido] = {};
      }
      if (!acc[hub.sido]?.[hub.gungu]) {
        acc[hub.sido][hub.gungu] = [];
      }
      const existingGroup = acc[hub.sido][hub.gungu]?.find(
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
        [gungu: string]: T[][];
      };
    },
  );
};

export const getHubsWithInfoInRoute = (
  route: ShuttleRoutesViewEntity,
): HubWithInfo[] => {
  const shuttleRouteId = route.shuttleRouteId;
  const remainingSeat = getRemainingSeat(route);

  const toDestinationHubs =
    route.toDestinationShuttleRouteHubs &&
    route.toDestinationShuttleRouteHubs.length > 0 &&
    route.regularPriceToDestination !== null &&
    route.regularPriceToDestination > 0
      ? route.toDestinationShuttleRouteHubs.filter((hub) => hub.role === 'HUB')
      : null;
  const fromDestinationHubs =
    route.fromDestinationShuttleRouteHubs &&
    route.fromDestinationShuttleRouteHubs.length > 0 &&
    route.regularPriceFromDestination !== null &&
    route.regularPriceFromDestination > 0
      ? route.fromDestinationShuttleRouteHubs.filter(
          (hub) => hub.role === 'HUB',
        )
      : null;
  const hubs = (toDestinationHubs || fromDestinationHubs) ?? [];

  const hubsWithInfo = hubs.map((hub) => {
    const hubRegion = ID_TO_REGION[hub.regionId];
    return {
      ...hub,
      shuttleRouteId,
      sido: hubRegion.bigRegion,
      gungu: hubRegion.smallRegion,
      remainingSeat,
    };
  });

  return hubsWithInfo;
};

export const getRouteOfHubWithInfo = ({
  hubWithInfo,
  dailyEventIdsWithRoutes,
  dailyEventId,
}: {
  hubWithInfo: HubWithInfo;
  dailyEventIdsWithRoutes: DailyEventIdsWithRoutes;
  dailyEventId: string;
}) => {
  const routes = dailyEventIdsWithRoutes[dailyEventId];
  if (!routes) {
    return null;
  }
  return routes.find(
    (route) => route.shuttleRouteId === hubWithInfo.shuttleRouteId,
  );
};
