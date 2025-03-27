import { EventWithRoutesViewEntity } from '@/types/event.type';
import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';

export const checkIsReservationOpen = (
  event: EventWithRoutesViewEntity | null,
) => {
  if (!event) {
    return false;
  }
  return event.minRoutePrice !== null;
};

export interface RemainingSeat {
  ROUND_TRIP: number;
  TO_DESTINATION: number;
  FROM_DESTINATION: number;
}

export const getRemainingSeat = (
  route: ShuttleRoutesViewEntity,
): RemainingSeat => {
  const maxSeatCount = route.maxPassengerCount ?? 0;
  const toDestinationCount = maxSeatCount - (route?.toDestinationCount ?? 0);
  const fromDestinationCount =
    maxSeatCount - (route?.fromDestinationCount ?? 0);
  const roundTripCount = Math.min(toDestinationCount, fromDestinationCount);

  return {
    ROUND_TRIP: roundTripCount,
    TO_DESTINATION: toDestinationCount,
    FROM_DESTINATION: fromDestinationCount,
  };
};

export const getPriorityRemainingSeat = (
  remainingSeat: RemainingSeat,
): { type: TripType; count: number } | null => {
  switch (true) {
    case remainingSeat.ROUND_TRIP > 0:
      return { type: 'ROUND_TRIP', count: remainingSeat.ROUND_TRIP };
    case remainingSeat.TO_DESTINATION > 0:
      return { type: 'TO_DESTINATION', count: remainingSeat.TO_DESTINATION };
    case remainingSeat.FROM_DESTINATION > 0:
      return {
        type: 'FROM_DESTINATION',
        count: remainingSeat.FROM_DESTINATION,
      };
    default:
      return null;
  }
};

export const checkIsSoldOut = (remainingSeat: RemainingSeat) => {
  return (
    remainingSeat.ROUND_TRIP === 0 &&
    remainingSeat.TO_DESTINATION === 0 &&
    remainingSeat.FROM_DESTINATION === 0
  );
};
