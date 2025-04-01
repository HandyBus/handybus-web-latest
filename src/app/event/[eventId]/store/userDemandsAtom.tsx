import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import { atom } from 'jotai';

export const userDemandsAtom = atom<ShuttleDemandsViewEntity[]>([]);

export const checkIsUserDemandAvailableInRegion = (
  demands: ShuttleDemandsViewEntity[],
  {
    eventId,
    dailyEventId,
    regionId,
  }: { eventId: string; dailyEventId: string; regionId: string },
): boolean => {
  return demands.some(
    (demand) =>
      demand.eventId === eventId &&
      demand.dailyEventId === dailyEventId &&
      demand.regionId === regionId,
  );
};
