import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';
import dayjs from 'dayjs';
import { SyntheticEvent } from 'react';

// +821012345678 -> 01012345678
export const formatPhoneNumber = (phoneNumber: string, withHyphen = false) => {
  const basePhoneNumber = '0' + phoneNumber.slice(3);
  const withHyphenPhoneNumber = `${basePhoneNumber.slice(0, 3)}-${basePhoneNumber.slice(3, 7)}-${basePhoneNumber.slice(7)}`;
  return withHyphen ? withHyphenPhoneNumber : basePhoneNumber;
};

export const getBoardingTime = ({
  tripType,
  toDestinationShuttleRouteHubs,
  fromDestinationShuttleRouteHubs,
  toDestinationShuttleRouteHubId,
}: {
  tripType: TripType;
  toDestinationShuttleRouteHubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  fromDestinationShuttleRouteHubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  toDestinationShuttleRouteHubId: string;
}) => {
  const sortedToDestinationShuttleRouteHubs =
    toDestinationShuttleRouteHubs?.toSorted((a, b) => a.sequence - b.sequence);
  const sortedFromDestinationShuttleRouteHubs =
    fromDestinationShuttleRouteHubs?.toSorted(
      (a, b) => a.sequence - b.sequence,
    );
  const boardingHubs =
    tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION'
      ? {
          hubs: sortedToDestinationShuttleRouteHubs,
          hubId: toDestinationShuttleRouteHubId,
        }
      : {
          hubs: sortedFromDestinationShuttleRouteHubs,
          hubId: sortedFromDestinationShuttleRouteHubs?.[0]?.shuttleRouteHubId,
        };

  const boardingTime = boardingHubs.hubs?.find(
    (hub) => hub.shuttleRouteHubId === boardingHubs.hubId,
  )?.arrivalTime;

  if (!boardingTime) {
    return null;
  }

  return dayjs(boardingTime).tz('Asia/Seoul');
};

export const handleClickAndStopPropagation = (callback: () => void) => {
  return (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };
};
