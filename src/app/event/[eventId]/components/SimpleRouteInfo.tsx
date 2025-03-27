'use client';

import { ReactNode, useMemo, useState } from 'react';
import PinIcon from '../icons/pin-primary.svg';
import DotPrimaryIcon from '../icons/dot-primary.svg';
import DotTertiaryIcon from '../icons/dot-tertiary.svg';
import ChevronDownIcon from '../icons/chevron-down.svg';
import { TripType } from '@/types/shuttleRoute.type';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';
import { customTwMerge } from 'tailwind.config';

// eventLocation: 이벤트 장소
// primary: 선택된 정류장
// secondary: 경유 정류장 (유저 입장)
// tertiary: 경유하지 않는 정류장 (유저 입장)
type HubType = 'eventLocation' | 'primary' | 'secondary' | 'tertiary';

interface Props {
  tripType: Exclude<TripType, 'ROUND_TRIP'>;
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubId: string;
}

const SimpleRouteInfo = ({ tripType, hubs, selectedHubId }: Props) => {
  const [showDetail, setShowDetail] = useState(false);

  const selectedHubIndex = useMemo(
    () => hubs.findIndex((hub) => hub.shuttleRouteHubId === selectedHubId),
    [hubs, selectedHubId],
  );

  return (
    <div className="flex w-full gap-12">
      <div className="flex w-12 shrink-0 flex-col items-center pt-[7px]">
        <RouteLine
          length={hubs.length}
          selectedHubIndex={selectedHubIndex}
          tripType={tripType}
          showDetail={showDetail}
        />
      </div>
      <div className="flex flex-1 flex-col gap-12">
        <Hubs
          hubs={hubs}
          selectedHubIndex={selectedHubIndex}
          tripType={tripType}
          showDetail={showDetail}
        />
      </div>
      <div className="shrink-0">
        <button
          type="button"
          onClick={() => setShowDetail(!showDetail)}
          className={`transition-transform duration-100 ease-in-out ${
            showDetail ? 'rotate-180' : ''
          }`}
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
};

export default SimpleRouteInfo;

interface HubsProps {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubIndex: number;
  tripType: TripType;
  showDetail: boolean;
}

const Hubs = ({ hubs, selectedHubIndex, tripType, showDetail }: HubsProps) => {
  return (
    <>
      {hubs.map((hub, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length: hubs.length,
        });
        return (
          <Hub
            key={hub.shuttleRouteHubId}
            type={type}
            time={hub.arrivalTime}
            name={hub.name}
            showDetail={showDetail}
          />
        );
      })}
    </>
  );
};

interface HubProps {
  type: HubType;
  time: string;
  name: string;
  showDetail: boolean;
}

const Hub = ({ type, time, name, showDetail }: HubProps) => {
  const formattedTime = dateString(time, {
    showYear: false,
    showDate: false,
    showWeekday: false,
    showTime: true,
  });
  const isHidden = !showDetail && (type === 'secondary' || type === 'tertiary');
  return (
    <p
      className={customTwMerge(
        'flex h-[26px] items-center gap-[9px]',
        isHidden && 'hidden',
      )}
    >
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
        {name}
      </span>
    </p>
  );
};

interface RouteLineProps {
  length: number;
  selectedHubIndex: number;
  tripType: TripType;
  showDetail: boolean;
}

const RouteLine = ({
  length,
  selectedHubIndex,
  tripType,
  showDetail,
}: RouteLineProps) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length,
        });
        const isHidden =
          !showDetail && (type === 'secondary' || type === 'tertiary');
        if (isHidden) {
          return null;
        }

        const getHubIcon = (): ReactNode => {
          switch (type) {
            case 'primary':
              return <DotPrimaryIcon />;
            case 'secondary':
              return <DotPrimaryIcon />;
            case 'tertiary':
              return <DotTertiaryIcon />;
            case 'eventLocation':
              return <PinIcon />;
            default:
              return null;
          }
        };
        const HubIcon = getHubIcon();

        const Line = (
          <div
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
              {HubIcon}
              {index !== length - 1 && Line}
            </>
          );
        } else {
          return (
            <>
              {index !== 0 && Line}
              {HubIcon}
            </>
          );
        }
      })}
    </>
  );
};

const getHubType = ({
  index,
  selectedHubIndex,
  tripType,
  length,
}: {
  index: number;
  selectedHubIndex: number;
  tripType: TripType;
  length: number;
}): HubType => {
  if (index === selectedHubIndex) {
    return 'primary';
  }
  if (tripType === 'TO_DESTINATION') {
    if (index === length - 1) {
      return 'eventLocation';
    }
    return index > selectedHubIndex ? 'secondary' : 'tertiary';
  }
  if (tripType === 'FROM_DESTINATION') {
    if (index === 0) {
      return 'eventLocation';
    }
    return index < selectedHubIndex ? 'secondary' : 'tertiary';
  }
  return 'secondary';
};
