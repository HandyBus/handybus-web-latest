import { atom } from 'jotai';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

export interface DailyEventIdsWithRoutes {
  [dailyEventId: string]: ShuttleRoutesViewEntity[];
}

const primitiveDailyEventIdsWithRoutesAtom = atom<DailyEventIdsWithRoutes>({});

export const dailyEventIdsWithRoutesAtom = atom(
  (get) => get(primitiveDailyEventIdsWithRoutesAtom),
  (get, set, routes: ShuttleRoutesViewEntity[]) => {
    const prev = get(primitiveDailyEventIdsWithRoutesAtom);
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
    }, prev);
    set(primitiveDailyEventIdsWithRoutesAtom, newDailyEventIdWithRoutes);
  },
);
