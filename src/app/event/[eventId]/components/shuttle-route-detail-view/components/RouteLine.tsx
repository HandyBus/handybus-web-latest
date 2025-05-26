import { customTwMerge } from 'tailwind.config';
import { getHubIcon, getHubType } from '../shuttleRouteDetailView.util';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { TripTypeWithoutRoundTrip } from '../shuttleRouteDetailView.type';

interface Props {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubIndex: number;
  tripType: TripTypeWithoutRoundTrip;
  openedHubIndexes: number[];
}

const RouteLine = ({
  hubs,
  selectedHubIndex,
  tripType,
  openedHubIndexes,
}: Props) => {
  return (
    <>
      {hubs.map((_, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length: hubs.length,
        });
        const HubIcon = getHubIcon(type);

        const isOpened = openedHubIndexes.includes(
          tripType === 'TO_DESTINATION' ? index : index - 1,
        );
        const Line = (
          <div
            key={index}
            className={customTwMerge(
              'my-[-2px] h-[60.4px] w-[2px]',
              isOpened && 'h-[227.3px]',
              type === 'tertiary'
                ? 'bg-basic-grey-200'
                : 'bg-brand-primary-400',
            )}
          />
        );

        if (tripType === 'TO_DESTINATION') {
          return (
            <>
              <div className="relative z-10 h-[11px]">{HubIcon}</div>
              {index !== hubs.length - 1 && Line}
            </>
          );
        } else {
          return (
            <>
              {index !== 0 && Line}
              <div className="relative z-10 h-[11px]">{HubIcon}</div>
            </>
          );
        }
      })}
    </>
  );
};

export default RouteLine;
