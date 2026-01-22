import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { TIME_NOT_DETERMINED_EVENT_ID } from '@/app/event/[eventId]/components/event-content/components/ShuttleScheduleView';

interface Props {
  eventId: string;
  date: string;
  time: string;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
  hideTime?: boolean;
  isHandyParty?: boolean;
  desiredHubAddress?: string;
  desiredHubLatitude?: number;
  desiredHubLongitude?: number;
}

const HubItem = ({
  eventId,
  date,
  time,
  hub,
  hideTime = false,
  isHandyParty = false,
  desiredHubAddress,
}: Props) => {
  return (
    <li className="flex h-36 w-full items-center gap-16">
      <div className="shrink-0">
        <p className="whitespace-nowrap break-keep text-10 font-400 text-basic-grey-700">
          {date}
        </p>
        <p className="whitespace-nowrap break-keep text-12 font-600">
          {hideTime
            ? '운행시간 상이'
            : eventId !== TIME_NOT_DETERMINED_EVENT_ID
              ? time
              : '미정'}
        </p>
      </div>
      <div className="h-16 w-[1px] bg-basic-grey-100" />
      <div className="text-16 font-600">
        {isHandyParty ? desiredHubAddress : hub.name}
      </div>
    </li>
  );
};

export default HubItem;
