import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';
import { getHubType } from '../shuttleRouteDetailView.util';
import Hub from './Hub';

interface Props {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubIndex: number;
  tripType: Exclude<TripType, 'ROUND_TRIP'>;
  addOpenedHubIndex: (index: number) => void;
  removeOpenedHubIndex: (index: number) => void;
  isHandyParty: boolean;
}

const Hubs = ({
  hubs,
  selectedHubIndex,
  tripType,
  addOpenedHubIndex,
  removeOpenedHubIndex,
  isHandyParty,
}: Props) => {
  return (
    <>
      {hubs.map((hub, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length: hubs.length,
        });
        const isLastHub = index === hubs.length - 1;
        const hideTime = type !== 'eventDestination' && isHandyParty;
        return (
          <Hub
            key={hub.shuttleRouteHubId}
            type={type}
            tripType={tripType}
            hub={hub}
            isLastHub={isLastHub}
            index={index}
            addOpenedHubIndex={addOpenedHubIndex}
            removeOpenedHubIndex={removeOpenedHubIndex}
            hideTime={hideTime}
          />
        );
      })}
    </>
  );
};

export default Hubs;
