import { TripType } from '@/types/shuttle-operation.type';
import { ShuttleRoute } from '@/types/shuttle-operation.type';
import { compareToNow } from '@/utils/dateString.util';

export const checkIsEarlybird = (shuttleRoute: ShuttleRoute | undefined) => {
  if (!shuttleRoute) {
    return false;
  }
  return Boolean(
    shuttleRoute.hasEarlybird &&
      shuttleRoute.earlybirdDeadline &&
      compareToNow(shuttleRoute.earlybirdDeadline, (a, b) => a > b),
  );
};

export const getSinglePrice = (
  type: TripType | undefined,
  shuttleRoute: ShuttleRoute | undefined,
) => {
  if (!shuttleRoute || !type) {
    return 0;
  }
  const price =
    type === 'ROUND_TRIP'
      ? shuttleRoute.regularPriceRoundTrip
      : type === 'TO_DESTINATION'
        ? shuttleRoute.regularPriceToDestination
        : shuttleRoute.regularPriceFromDestination;
  return price;
};

export const getSinglePriceWithEarlybird = (
  type: TripType | undefined,
  shuttleRoute: ShuttleRoute | undefined,
) => {
  if (!shuttleRoute || !type) {
    return 0;
  }
  const isEarlybird = checkIsEarlybird(shuttleRoute);
  const price = isEarlybird
    ? type === 'ROUND_TRIP'
      ? (shuttleRoute.earlybirdPriceRoundTrip ?? 0)
      : type === 'TO_DESTINATION'
        ? (shuttleRoute.earlybirdPriceToDestination ?? 0)
        : (shuttleRoute.earlybirdPriceFromDestination ?? 0)
    : getSinglePrice(type, shuttleRoute);
  return price;
};

export const generateCustomerKey = async (userId: string): Promise<string> => {
  return `USER_${userId}`;
};
