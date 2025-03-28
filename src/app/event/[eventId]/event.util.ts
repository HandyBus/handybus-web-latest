import { EventWithRoutesViewEntity } from '@/types/event.type';
import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { compareToNow } from '@/utils/dateString.util';
import { EventEnabledStatus, EventPhase } from './form.type';

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

export const calculatePriceOfTripType = (
  route: ShuttleRoutesViewEntity | null | undefined,
):
  | {
      [tripType in TripType]: {
        isEarlybird: boolean;
        regularPrice: number;
        earlybirdPrice: number | null;
      };
    }
  | null => {
  if (!route) {
    return null;
  }

  const isEarlybird =
    route?.hasEarlybird && route?.earlybirdDeadline
      ? compareToNow(route.earlybirdDeadline, (a, b) => a > b)
      : false;

  const {
    regularPriceRoundTrip = 0,
    regularPriceToDestination = 0,
    regularPriceFromDestination = 0,
    earlybirdPriceRoundTrip = 0,
    earlybirdPriceToDestination = 0,
    earlybirdPriceFromDestination = 0,
  } = route;

  const calculatedTripType = {
    ROUND_TRIP: {
      isEarlybird,
      regularPrice: regularPriceRoundTrip,
      earlybirdPrice: earlybirdPriceRoundTrip,
    },
    TO_DESTINATION: {
      isEarlybird,
      regularPrice: regularPriceToDestination,
      earlybirdPrice: earlybirdPriceToDestination,
    },
    FROM_DESTINATION: {
      isEarlybird,
      regularPrice: regularPriceFromDestination,
      earlybirdPrice: earlybirdPriceFromDestination,
    },
  };

  return calculatedTripType;
};

export const getPhaseAndEnabledStatus = (
  event: EventWithRoutesViewEntity | null | undefined,
): {
  type: EventPhase;
  status: EventEnabledStatus;
} => {
  if (!event) {
    return { type: 'demand', status: 'disabled' };
  }
  const isDemandOver = event.eventStatus === 'CLOSED';
  const isReservationOpen = event.minRoutePrice !== null;
  const isReservationOngoing = event.hasOpenRoute;

  switch (true) {
    case !isDemandOver && !isReservationOpen:
      return { type: 'demand', status: 'enabled' };
    case isDemandOver && !isReservationOpen:
      return { type: 'demand', status: 'disabled' };
    case isReservationOpen && isReservationOngoing:
      return { type: 'reservation', status: 'enabled' };
    case isReservationOpen && !isReservationOngoing:
    default:
      return { type: 'reservation', status: 'disabled' };
  }
};
