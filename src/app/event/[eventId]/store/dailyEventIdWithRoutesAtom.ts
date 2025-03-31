import { atom } from 'jotai';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

export interface DailyEventIdWithRoutes {
  [dailyEventId: string]: ShuttleRoutesViewEntity[];
}

const primitiveDailyEventIdWithRoutesAtom = atom<DailyEventIdWithRoutes>({});

export const dailyEventIdWithRoutesAtom = atom(
  (get) => get(primitiveDailyEventIdWithRoutesAtom),
  (get, set, routes: ShuttleRoutesViewEntity[]) => {
    const prev = get(primitiveDailyEventIdWithRoutesAtom);
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
    set(primitiveDailyEventIdWithRoutesAtom, newDailyEventIdWithRoutes);
  },
);
