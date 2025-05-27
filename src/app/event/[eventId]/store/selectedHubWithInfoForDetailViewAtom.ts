import { atom } from 'jotai';
import { HubWithInfo } from './dailyEventIdsWithHubsAtom';

export const selectedHubWithInfoForDetailViewAtom = atom<HubWithInfo | null>(
  null,
);

export const isCheckRouteDetailViewFlowAtom = atom<boolean>(false);
