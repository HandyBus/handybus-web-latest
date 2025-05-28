import { atom } from 'jotai';
import { HubWithInfo } from './dailyEventIdsWithHubsAtom';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';

export const selectedHubWithInfoForDetailViewAtom = atom<{
  hubWithInfo: HubWithInfo;
  dailyEvent: DailyEventsInEventsViewEntity;
} | null>(null);

export const isCheckRouteDetailViewFlowAtom = atom<boolean>(false);
