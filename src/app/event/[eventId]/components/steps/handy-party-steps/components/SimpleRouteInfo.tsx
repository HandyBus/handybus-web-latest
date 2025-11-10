'use client';

import { useMemo } from 'react';
import PinIcon from '../icons/pin-primary.svg';
import DotPrimaryIcon from '../icons/dot-primary.svg';
import { TripType } from '@/types/shuttleRoute.type';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';

type TripTypeWithoutRoundTrip = Exclude<TripType, 'ROUND_TRIP'>;

interface Props {
  tripType: TripTypeWithoutRoundTrip;
  destinationHub: ShuttleRouteHubsInShuttleRoutesViewEntity;
  userAddress: string;
}

const SimpleRouteInfo = ({ tripType, destinationHub, userAddress }: Props) => {
  const tripTypeText = useMemo(() => {
    const baseText = tripType === 'TO_DESTINATION' ? '행사장행' : '귀가행';
    return '[핸디팟] ' + baseText;
  }, [tripType]);

  return (
    <article className="flex flex-col gap-12 rounded-12 border border-basic-grey-100 p-12">
      <div className="flex h-[31px] w-full items-center justify-between">
        <span className="text-16 font-600">{tripTypeText}</span>
      </div>
      <div className="h-[1px] w-full bg-basic-grey-100" />
      <div className="flex w-full gap-12">
        <div className="flex w-12 shrink-0 flex-col items-center pt-[7px]">
          <RouteLine tripType={tripType} />
        </div>
        <div className="flex flex-1 flex-col gap-12">
          {tripType === 'TO_DESTINATION' ? (
            <>
              <Hub name={userAddress} hideTime />
              <Hub
                time={destinationHub.arrivalTime}
                name={destinationHub.name}
              />
            </>
          ) : (
            <>
              <Hub
                time={destinationHub.arrivalTime}
                name={destinationHub.name}
              />
              <Hub name={userAddress} hideTime />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default SimpleRouteInfo;

interface HubProps {
  time?: string;
  name: string;
  hideTime?: boolean;
}

const Hub = ({ time, name, hideTime = false }: HubProps) => {
  const formattedTime = dateString(time, {
    showYear: false,
    showDate: false,
    showWeekday: false,
    showTime: true,
  });

  return (
    <button type="button" className="flex h-[26px] items-center gap-[9px]">
      <span className="w-[78px] shrink-0 whitespace-nowrap break-keep text-left text-14 font-500 text-basic-grey-700">
        {hideTime ? '운행시간 상이' : formattedTime}
      </span>
      <span className="line-clamp-1 text-16 font-600 text-basic-black">
        {name}
      </span>
    </button>
  );
};

interface RouteLineProps {
  tripType: TripTypeWithoutRoundTrip;
}

const RouteLine = ({ tripType }: RouteLineProps) => {
  if (tripType === 'TO_DESTINATION') {
    return (
      <>
        <div className="relative z-10">
          <DotPrimaryIcon />
        </div>
        <div className="my-[-2px] h-[31.2px] w-[2px] bg-brand-primary-400" />
        <div className="relative z-10">
          <PinIcon />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="relative z-10">
        <PinIcon />
      </div>
      <div className="my-[-2px] h-[31.2px] w-[2px] bg-brand-primary-400" />
      <div className="relative z-10">
        <DotPrimaryIcon />
      </div>
    </>
  );
};
