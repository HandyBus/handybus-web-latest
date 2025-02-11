import { Reservation } from '@/types/user-management.type';
import dayjs, { Dayjs } from 'dayjs';

const getHubArrivalTime = (
  reservation: Reservation,
  type: 'to' | 'from',
): string | undefined => {
  const hubs =
    type === 'to'
      ? reservation.shuttleRoute.toDestinationShuttleRouteHubs
      : reservation.shuttleRoute.fromDestinationShuttleRouteHubs;

  const hubId =
    type === 'to'
      ? reservation.toDestinationShuttleRouteHubId
      : reservation.fromDestinationShuttleRouteHubId;

  return hubs?.find((hub) => hub.shuttleRouteHubId === hubId)?.arrivalTime;
};

export const calculateDDay = (
  reservation: Reservation | null,
): Dayjs | undefined => {
  if (!reservation) {
    return undefined;
  }

  if (
    reservation.type === 'ROUND_TRIP' ||
    reservation.type === 'TO_DESTINATION'
  ) {
    const arrivalTime = getHubArrivalTime(reservation, 'to');
    return arrivalTime ? dayjs(arrivalTime).startOf('day') : undefined;
  }

  if (reservation.type === 'FROM_DESTINATION') {
    const arrivalTime = getHubArrivalTime(reservation, 'from');
    return arrivalTime ? dayjs(arrivalTime).startOf('day') : undefined;
  }

  return undefined;
};
