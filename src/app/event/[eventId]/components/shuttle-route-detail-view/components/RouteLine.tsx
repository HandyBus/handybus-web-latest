import { customTwMerge } from 'tailwind.config';
import { getHubIcon, getHubType } from '../shuttleRouteDetailView.util';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { TripTypeWithoutRoundTrip } from '../shuttleRouteDetailView.type';

interface Props {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubIndex: number;
  tripType: TripTypeWithoutRoundTrip;
}

const RouteLine = ({ hubs, selectedHubIndex, tripType }: Props) => {
  return (
    <>
      {hubs.map((hub, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length: hubs.length,
        });
        const HubIcon = getHubIcon(type);

        const Line = (
          <div
            key={index}
            className={customTwMerge(
              'my-[-2px] h-[31.2px] w-[2px]',
              type === 'tertiary'
                ? 'bg-basic-grey-200'
                : 'bg-brand-primary-400',
            )}
          />
        );

        if (tripType === 'TO_DESTINATION') {
          return (
            <>
              <div className="relative z-10">{HubIcon}</div>
              {index !== hubs.length - 1 && Line}
            </>
          );
        } else {
          return (
            <>
              {index !== 0 && Line}
              <div className="relative z-10">{HubIcon}</div>
            </>
          );
        }
      })}
    </>
  );
};

export default RouteLine;
