import { atom } from 'jotai';
import { HubWithInfo } from './dailyEventIdsWithHubsAtom';

export const selectedHubWithInfoForDetailViewAtom = atom<{
  hubWithInfo: HubWithInfo;
  dailyEventId: string;
} | null>(null);

export const isCheckRouteDetailViewFlowAtom = atom<boolean>(false);
