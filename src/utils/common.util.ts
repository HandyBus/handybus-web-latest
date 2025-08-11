import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';
import dayjs from 'dayjs';
import { SyntheticEvent } from 'react';

// +821012345678 -> 01012345678
export const formatPhoneNumber = (phoneNumber: string, withHyphen = false) => {
  const basePhoneNUmber = '0' + phoneNumber.slice(3);
  const withHyphenPhoneNumber = `${basePhoneNUmber.slice(0, 3)}-${basePhoneNUmber.slice(3, 7)}-${basePhoneNUmber.slice(7)}`;
  return withHyphen ? withHyphenPhoneNumber : basePhoneNUmber;
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
