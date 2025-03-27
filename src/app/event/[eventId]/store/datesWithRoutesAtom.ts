import { atom } from 'jotai';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

export interface DatesWithRoutes {
  [date: string]: ShuttleRoutesViewEntity[];
}

const primitiveDatesWithRoutesAtom = atom<DatesWithRoutes>({});

export const datesWithRoutesAtom = atom(
  (get) => get(primitiveDatesWithRoutesAtom),
  (get, set, update: { date: string; routes: ShuttleRoutesViewEntity[] }) => {
    const prev = get(primitiveDatesWithRoutesAtom);
    set(primitiveDatesWithRoutesAtom, {
      ...prev,
      [update.date]: update.routes,
    });
  },
);
