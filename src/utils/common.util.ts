import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';
import dayjs from 'dayjs';

// +8210 1234-5678 -> 010-1234-5678
export const parsePhoneNumber = (phoneNumber: string) => {
  return '0' + phoneNumber.slice(3);
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
