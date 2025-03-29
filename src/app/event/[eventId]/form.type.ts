import { TripType } from '@/types/shuttleRoute.type';
import { BigRegionsType } from '@/constants/regions';
import { HubWithInfo } from './store/datesWithHubsAtom';
import { RegionHubsResponseModel } from '@/types/hub.type';

export interface EventFormValues {
  date: string;
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
