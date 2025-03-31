import { atomWithCache } from 'jotai-cache';
import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  ShuttleRoutesViewEntity,
} from '@/types/shuttleRoute.type';
import { BigRegionsType, ID_TO_REGION } from '@/constants/regions';
import {
  DailyEventIdWithRoutes,
  dailyEventIdWithRoutesAtom,
} from './dailyEventIdWithRoutesAtom';
import { getRemainingSeat, RemainingSeat } from '../event.util';

export interface HubWithInfo extends ShuttleRouteHubsInShuttleRoutesViewEntity {
  shuttleRouteId: string;
  sido: BigRegionsType;
  gungu: string;
  remainingSeat: RemainingSeat;
}

interface DailyEventIdWithHubs {
  [dailyEventId: string]: {
    [sido in BigRegionsType]: {
      [gungu: string]: HubWithInfo[][];
    };
  };
}

export const dailyEventIdWithHubsAtom = atomWithCache<DailyEventIdWithHubs>(
  (get) => {
    const dailyEventIdWithRoutes = get(dailyEventIdWithRoutesAtom);
    const dailyEventIdWithHubs = Object.entries(dailyEventIdWithRoutes).map(
      ([dailyEventId, routes]) => {
        const hubsWithInfo = routes.reduce((acc, route) => {
          const newHubsWithInfo = getHubsWithInfoInRoute(route);
          return [...acc, ...newHubsWithInfo];
        }, [] as HubWithInfo[]);

        const groupedHubs = groupHubsByRegion(hubsWithInfo);
        return [dailyEventId, groupedHubs];
      },
    );
    return Object.fromEntries(dailyEventIdWithHubs);
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
      remainingSeat,
    };
  });

  return hubsWithInfo;
};

export const getRouteOfHubWithInfo = ({
  hubWithInfo,
  dailyEventIdWithRoutes,
  dailyEventId,
}: {
  hubWithInfo: HubWithInfo;
  dailyEventIdWithRoutes: DailyEventIdWithRoutes;
  dailyEventId: string;
}) => {
  const routes = dailyEventIdWithRoutes[dailyEventId];
  if (!routes) {
    return null;
  }
  return routes.find(
    (route) => route.shuttleRouteId === hubWithInfo.shuttleRouteId,
  );
};
