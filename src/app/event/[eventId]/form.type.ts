import { TripType } from '@/types/shuttleRoute.type';
import { BigRegionsType } from '@/constants/regions';
import { HubWithInfo } from './store/datesWithHubsAtom';

export interface EventFormValues {
  date: string;
  sido: BigRegionsType;
  openSido?: BigRegionsType;
  selectedHubWithInfo: HubWithInfo;
  hubsWithInfoForDuplicates?: HubWithInfo[];
  tripType: TripType;
}

export type EventPhase = 'demand' | 'reservation';

export type EventEnabledStatus = 'enabled' | 'disabled';
