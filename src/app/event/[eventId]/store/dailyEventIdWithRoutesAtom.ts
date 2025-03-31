import { atom } from 'jotai';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

export interface DailyEventIdWithRoutes {
  [dailyEventId: string]: ShuttleRoutesViewEntity[];
}

const primitiveDailyEventIdWithRoutesAtom = atom<DailyEventIdWithRoutes>({});

export const dailyEventIdWithRoutesAtom = atom(
  (get) => get(primitiveDailyEventIdWithRoutesAtom),
  (get, set, update: ShuttleRoutesViewEntity[]) => {
    const prev = get(primitiveDailyEventIdWithRoutesAtom);
    const newDailyEventIdWithRoutes = update.reduce((acc, route) => {
      const dailyEventId = route.dailyEventId;
      acc[dailyEventId] = [...(acc[dailyEventId] || []), route];
      return acc;
    }, prev);
    set(primitiveDailyEventIdWithRoutesAtom, newDailyEventIdWithRoutes);
  },
);
