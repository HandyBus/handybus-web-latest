import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';
import {
  HubType,
  TripTypeWithoutRoundTrip,
} from '../shuttleRouteDetailView.type';
import ArrowDownIcon from '../../../icons/arrow-down.svg';
import KakaoMap from './KakaoMap';
import Badge from '@/components/badge/Badge';

interface Props {
  type: HubType;
  tripType: TripTypeWithoutRoundTrip;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
  isLastHub: boolean;
  index: number;
  addOpenedHubIndex: (index: number) => void;
  removeOpenedHubIndex: (index: number) => void;
  isKakaoMapScriptLoaded: boolean;
  hideTime?: boolean;
}

const Hub = ({
  type,
  tripType,
  hub,
  isLastHub,
  index,
  addOpenedHubIndex,
  removeOpenedHubIndex,
  isKakaoMapScriptLoaded,
  hideTime = false,
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
      className={`group px-8 py-16 [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden ${!isLastHub ? 'border-b border-basic-grey-100' : ''}`}
      onToggle={(e) => {
        const target = e.target as HTMLDetailsElement;
        if (target.open) {
          handleOpen();
        } else {
          handleClose();
        }
      }}
    >
      <summary className="w-full cursor-pointer list-none">
        <div className="flex w-full items-center gap-[9px]">
          <span
            className={`w-[64px] shrink-0 whitespace-nowrap break-keep text-left text-12 font-500 ${
              type === 'eventDestination'
                ? 'text-basic-grey-700'
                : type === 'primary'
                  ? 'text-basic-grey-700'
                  : type === 'secondary'
                    ? 'text-basic-grey-700'
                    : 'text-basic-grey-500'
            }`}
          >
            {hideTime ? '운행시간 상이' : formattedTime}
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
        </div>
        {type === 'eventDestination' && (
          <Badge className="mt-4 w-fit bg-basic-grey-100 text-basic-grey-700">
            {tripType === 'TO_DESTINATION'
              ? '공연 1시간 전 도착 예정이에요'
              : '공연 종료 후 약 1시간 뒤 출발해요'}
          </Badge>
        )}
      </summary>
      <div className="mt-[9px] w-full px-8">
        <div className="h-168 w-full overflow-hidden rounded-8 border border-basic-grey-200 bg-basic-grey-200">
          <KakaoMap
            placeName={hub.name}
            latitude={hub.latitude}
            longitude={hub.longitude}
            isKakaoMapScriptLoaded={isKakaoMapScriptLoaded}
          />
        </div>
      </div>
    </details>
  );
};

export default Hub;
