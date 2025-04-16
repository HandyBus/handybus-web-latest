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
import Button from '@/components/buttons/button/Button';

const ROUND_TRIP_TEXT = '[왕복] ';

// eventLocation: 이벤트 장소
// primary: 선택된 정류장
// secondary: 경유 정류장 (유저 입장)
// tertiary: 경유하지 않는 정류장 (유저 입장)
type HubType = 'eventLocation' | 'primary' | 'secondary' | 'tertiary';

interface Props {
  tripType: Exclude<TripType, 'ROUND_TRIP'>;
  isRoundTrip: boolean;
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedShuttleRouteHubId: string;
  setSelectedShuttleRouteHubId: (shuttleRouteHubId: string | undefined) => void;
}

const SimpleRouteInfo = ({
  tripType,
  isRoundTrip,
  hubs,
  selectedShuttleRouteHubId,
  setSelectedShuttleRouteHubId,
}: Props) => {
  const [showDetail, setShowDetail] = useState(false);
  const sortedHubs = useMemo(() => {
    return hubs.toSorted((a, b) => a.sequence - b.sequence);
  }, [hubs]);

  const selectedHubIndex = useMemo(
    () =>
      sortedHubs.findIndex(
        (hub) => hub.shuttleRouteHubId === selectedShuttleRouteHubId,
      ),
    [sortedHubs, selectedShuttleRouteHubId],
  );

  const isExpandable = useMemo(() => {
    return hubs.length >= 3;
  }, [hubs]);

  const tripTypeText = useMemo(() => {
    const baseText = tripType === 'TO_DESTINATION' ? '가는 편' : '오는 편';
    if (isRoundTrip) {
      return ROUND_TRIP_TEXT + baseText;
    }
    return baseText;
  }, [isRoundTrip, tripType]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [stagedShuttleRouteHubId, setStagedShuttleRouteHubId] = useState<
    string | undefined
  >(undefined);

  const handleStartEditMode = () => {
    setShowDetail(true);
    setIsEditMode(true);
    setStagedShuttleRouteHubId(selectedShuttleRouteHubId);
  };

  const handleCancelEditMode = () => {
    setIsEditMode(false);
    setStagedShuttleRouteHubId(undefined);
  };

  const handleCompleteEditMode = () => {
    setIsEditMode(false);
    setStagedShuttleRouteHubId(undefined);
    setSelectedShuttleRouteHubId(stagedShuttleRouteHubId);
  };

  return (
    <article className="flex flex-col gap-12 rounded-12 border border-basic-grey-100 p-12">
      <div className="flex h-[31px] w-full items-center justify-between">
        <span className="text-16 font-600">{tripTypeText}</span>
        {!isEditMode ? (
          <Button
            variant="tertiary"
            size="small"
            type="button"
            disabled={!isExpandable}
            onClick={handleStartEditMode}
          >
            변경
          </Button>
        ) : (
          <div className="flex gap-12">
            <Button
              variant="tertiary"
              size="small"
              type="button"
              className="bg-basic-white"
              onClick={handleCancelEditMode}
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="small"
              type="button"
              disabled={stagedShuttleRouteHubId === selectedShuttleRouteHubId}
              onClick={handleCompleteEditMode}
            >
              완료
            </Button>
          </div>
        )}
      </div>
      <div className="h-[1px] w-full bg-basic-grey-100" />
      <div className="flex w-full gap-12">
        <div className="flex w-12 shrink-0 flex-col items-center pt-[7px]">
          <RouteLine
            hubs={sortedHubs}
            selectedHubIndex={selectedHubIndex}
            tripType={tripType}
            showDetail={showDetail}
            isEditMode={isEditMode}
            stagedShuttleRouteHubId={stagedShuttleRouteHubId}
          />
        </div>
        <div className="flex flex-1 flex-col gap-12">
          <Hubs
            hubs={sortedHubs}
            selectedHubIndex={selectedHubIndex}
            tripType={tripType}
            showDetail={showDetail}
            isEditMode={isEditMode}
            stagedShuttleRouteHubId={stagedShuttleRouteHubId}
            setStagedShuttleRouteHubId={setStagedShuttleRouteHubId}
          />
        </div>
        {isExpandable && (
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
        )}
      </div>
    </article>
  );
};

export default SimpleRouteInfo;

interface HubsProps {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubIndex: number;
  tripType: TripType;
  showDetail: boolean;
  isEditMode: boolean;
  stagedShuttleRouteHubId: string | undefined;
  setStagedShuttleRouteHubId: (shuttleRouteHubId: string | undefined) => void;
}

const Hubs = ({
  hubs,
  selectedHubIndex,
  tripType,
  showDetail,
  isEditMode,
  stagedShuttleRouteHubId,
  setStagedShuttleRouteHubId,
}: HubsProps) => {
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
            isEditMode={isEditMode}
            isSelectedInEditMode={
              stagedShuttleRouteHubId === hub.shuttleRouteHubId
            }
            onClick={() => setStagedShuttleRouteHubId(hub.shuttleRouteHubId)}
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
  isEditMode: boolean;
  isSelectedInEditMode: boolean;
  onClick: () => void;
}

const Hub = ({
  type,
  time,
  name,
  showDetail,
  isEditMode,
  isSelectedInEditMode,
  onClick,
}: HubProps) => {
  const formattedTime = dateString(time, {
    showYear: false,
    showDate: false,
    showWeekday: false,
    showTime: true,
  });
  const isHidden = !showDetail && (type === 'secondary' || type === 'tertiary');

  return (
    <button
      type="button"
      disabled={!isEditMode || type === 'eventLocation'}
      className={customTwMerge(
        'flex h-[26px] items-center gap-[9px]',
        isHidden && 'hidden',
      )}
      onClick={onClick}
    >
      <span
        className={`shrink-0 text-14 font-500 ${
          !isEditMode
            ? type === 'eventLocation'
              ? 'text-basic-grey-700'
              : type === 'primary'
                ? 'text-basic-grey-700'
                : type === 'secondary'
                  ? 'text-basic-grey-700'
                  : 'text-basic-grey-500'
            : isSelectedInEditMode || type === 'eventLocation'
              ? 'text-basic-grey-700'
              : 'text-basic-grey-500'
        }`}
      >
        {formattedTime}
      </span>
      <span
        className={`line-clamp-1 text-16 ${
          !isEditMode
            ? type === 'eventLocation'
              ? 'font-600 text-basic-black'
              : type === 'primary'
                ? 'font-600 text-basic-black'
                : type === 'secondary'
                  ? 'font-500 text-basic-grey-700'
                  : 'font-500 text-basic-grey-500'
            : isSelectedInEditMode || type === 'eventLocation'
              ? 'font-600 text-basic-black'
              : 'font-500 text-basic-grey-700'
        }`}
      >
        {name}
      </span>
    </button>
  );
};

interface RouteLineProps {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubIndex: number;
  tripType: TripType;
  showDetail: boolean;
  isEditMode: boolean;
  stagedShuttleRouteHubId: string | undefined;
}

const RouteLine = ({
  hubs,
  selectedHubIndex,
  tripType,
  showDetail,
  isEditMode,
  stagedShuttleRouteHubId,
}: RouteLineProps) => {
  return (
    <>
      {hubs.map((hub, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length: hubs.length,
        });
        const isHidden =
          !showDetail && (type === 'secondary' || type === 'tertiary');
        if (isHidden) {
          return null;
        }

        const getHubIcon = (): ReactNode => {
          if (isEditMode) {
            if (type === 'eventLocation') {
              return <PinIcon />;
            }
            if (stagedShuttleRouteHubId === hub.shuttleRouteHubId) {
              return <DotPrimaryIcon />;
            }
            return <DotTertiaryIcon />;
          }

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
            key={index}
            className={customTwMerge(
              'my-[-2px] h-[31.2px] w-[2px]',
              type === 'tertiary' || isEditMode
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
