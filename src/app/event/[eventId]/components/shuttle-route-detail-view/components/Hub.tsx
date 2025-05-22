import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';
import { HubType } from '../shuttleRouteDetailView.type';

interface Props {
  type: HubType;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
}

const Hub = ({ type, hub }: Props) => {
  const formattedTime = dateString(hub.arrivalTime, {
    showYear: false,
    showDate: false,
    showWeekday: false,
    showTime: true,
  });

  return (
    <li className="flex h-[26px] items-center gap-[9px]">
      <span
        className={`shrink-0 text-14 font-500 ${
          type === 'eventLocation'
            ? 'text-basic-grey-700'
            : type === 'primary'
              ? 'text-basic-grey-700'
              : type === 'secondary'
                ? 'text-basic-grey-700'
                : 'text-basic-grey-500'
        }`}
      >
        {formattedTime}
      </span>
      <span
        className={`line-clamp-1 text-16 ${
          type === 'eventLocation'
            ? 'font-600 text-basic-black'
            : type === 'primary'
              ? 'font-600 text-basic-black'
              : type === 'secondary'
                ? 'font-500 text-basic-grey-700'
                : 'font-500 text-basic-grey-500'
        }`}
      >
        {hub.name}
      </span>
    </li>
  );
};

export default Hub;
