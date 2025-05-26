import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';
import { HubType } from '../shuttleRouteDetailView.type';
import ArrowDownIcon from '../../../icons/arrow-down.svg';

interface Props {
  type: HubType;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
  isLastHub: boolean;
  index: number;
  addOpenedHubIndex: (index: number) => void;
  removeOpenedHubIndex: (index: number) => void;
}

const Hub = ({
  type,
  hub,
  isLastHub,
  index,
  addOpenedHubIndex,
  removeOpenedHubIndex,
}: Props) => {
  const formattedTime = dateString(hub.arrivalTime, {
    showYear: false,
    showDate: false,
    showWeekday: false,
    showTime: true,
  });

  const handleOpen = () => {
    addOpenedHubIndex(index);
  };
  const handleClose = () => {
    removeOpenedHubIndex(index);
  };

  return (
    <details
      className={`group flex flex-col gap-[9px] px-8 py-16 [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden ${!isLastHub ? 'border-b border-basic-grey-100' : ''}`}
      onToggle={(e) => {
        const target = e.target as HTMLDetailsElement;
        if (target.open) {
          handleOpen();
        } else {
          handleClose();
        }
      }}
    >
      <summary className="flex w-full cursor-pointer list-none items-center gap-[9px]">
        <span
          className={`shrink-0 text-12 font-500 ${
            type === 'eventDestination'
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
          className={`line-clamp-1 grow text-14 font-500 ${
            type === 'eventDestination'
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
        <div className="shrink-0 transition-transform duration-100 group-open:rotate-[180deg]">
          <ArrowDownIcon />
        </div>
      </summary>
      <div className="w-full px-8">
        <div className="h-168 w-full rounded-8 bg-basic-grey-400" />
      </div>
    </details>
  );
};

export default Hub;
