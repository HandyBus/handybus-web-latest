import { TripType } from '@/types/shuttleRoute.type';
import { BigRegionsType } from '@/constants/regions';
import { HubWithInfo } from './store/datesWithHubsAtom';
import { RegionHubsResponseModel } from '@/types/hub.type';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';

export interface EventFormValues {
  dailyEvent: DailyEventsInEventsViewEntity;
  sido: BigRegionsType;
  openSido?: BigRegionsType;
  selectedHubWithInfo: HubWithInfo;
  hubsWithInfoForDuplicates?: HubWithInfo[];
  tripType: TripType;
  selectedHubForDemand: RegionHubsResponseModel;
  selectedHubForSeatAlarm: HubWithInfo;
}

export type EventPhase = 'demand' | 'reservation';

export type EventEnabledStatus = 'enabled' | 'disabled';
