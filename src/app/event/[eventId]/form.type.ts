import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { BigRegionsType } from '@/constants/regions';
import { HubWithInfo } from './store/dailyEventIdsWithHubsAtom';
import { RegionHubsResponseModel } from '@/types/hub.type';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { HandyPartyTripType } from './components/steps/handy-party-steps/HandyPartyModal';

export interface EventFormValues {
  dailyEvent: DailyEventsInEventsViewEntity;
  sido: BigRegionsType;
  openSido?: BigRegionsType;
  selectedHubWithInfo: HubWithInfo;
  hubsWithInfoForDuplicates?: HubWithInfo[];
  tripType: TripType;
  handyPartyTripType: HandyPartyTripType;
  selectedHubForDemand: RegionHubsResponseModel;
  selectedHubForSeatAlarm: HubWithInfo;
  selectedRouteForSeatAlarm: ShuttleRoutesViewEntity;
  selectedShuttleRouteAlertRequestIdForSeatAlarm: string;
  name: string;
  passengerCount: number;
}
