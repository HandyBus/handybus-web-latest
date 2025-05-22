import { atom } from 'jotai';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

export interface DailyEventIdsWithRoutes {
  [dailyEventId: string]: ShuttleRoutesViewEntity[];
}

const primitiveDailyEventIdsWithRoutesAtom = atom<DailyEventIdsWithRoutes>({});

export const dailyEventIdsWithRoutesAtom = atom(
  (get) => get(primitiveDailyEventIdsWithRoutesAtom),
  (_, set, routes: ShuttleRoutesViewEntity[]) => {
    const newDailyEventIdWithRoutes = routes.reduce((acc, route) => {
      const dailyEventId = route.dailyEventId;
      const prevRoutes = acc[dailyEventId] || [];
      const isDuplicate = prevRoutes.some(
        (prevRoute) => prevRoute.shuttleRouteId === route.shuttleRouteId,
      );
      if (isDuplicate) {
        return acc;
      }
      acc[dailyEventId] = [...prevRoutes, route];
      return acc;
    }, {} as DailyEventIdsWithRoutes);
    set(primitiveDailyEventIdsWithRoutesAtom, newDailyEventIdWithRoutes);
  },
);
