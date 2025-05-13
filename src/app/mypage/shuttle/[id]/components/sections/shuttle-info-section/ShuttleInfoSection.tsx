import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { TripType } from '@/types/shuttleRoute.type';
import TripCard from './components/TripCard';

interface Props {
  tripType: TripType;
  toDestinationHub:
    | ShuttleRouteHubsInShuttleRoutesViewEntity
    | null
    | undefined;
  fromDestinationHub:
    | ShuttleRouteHubsInShuttleRoutesViewEntity
    | null
    | undefined;
  shuttleRoute: ShuttleRoutesViewEntity;
  passengerCount: number;
}

const ShuttleInfoSection = ({
  tripType,
  toDestinationHub,
  fromDestinationHub,
  shuttleRoute,
  passengerCount,
}: Props) => {
  return (
    <section className="px-16">
      <h3 className="pb-16 text-16 font-600">셔틀 정보</h3>
      {(tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION') &&
        toDestinationHub && (
          <TripCard
            tripType="TO_DESTINATION"
            hub={toDestinationHub}
            shuttleRoute={shuttleRoute}
            withRoundTrip={tripType === 'ROUND_TRIP'}
            passengerCount={passengerCount}
          />
        )}
      {(tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION') &&
        fromDestinationHub && (
          <TripCard
            tripType="FROM_DESTINATION"
            hub={fromDestinationHub}
            shuttleRoute={shuttleRoute}
            withRoundTrip={tripType === 'ROUND_TRIP'}
            passengerCount={passengerCount}
          />
        )}
    </section>
  );
};

export default ShuttleInfoSection;
