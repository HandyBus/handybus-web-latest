import { atomWithCache } from 'jotai-cache';
import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  ShuttleRoutesViewEntity,
} from '@/types/shuttleRoute.type';
import { BigRegionsType, ID_TO_REGION } from '@/constants/regions';
import { datesWithRoutesAtom } from './datesWithRoutesAtom';
import { getRemainingSeat, RemainingSeat } from '../event.util';

export interface HubWithInfo extends ShuttleRouteHubsInShuttleRoutesViewEntity {
  shuttleRouteId: string;
  sido: BigRegionsType;
  gungu: string;
  remainingSeat: RemainingSeat;
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
