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
}

const Hubs = ({ hubs, selectedHubIndex, tripType }: Props) => {
  return (
    <>
      {hubs.map((hub, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length: hubs.length,
        });
        return <Hub key={hub.shuttleRouteHubId} type={type} hub={hub} />;
      })}
    </>
  );
};

export default Hubs;
