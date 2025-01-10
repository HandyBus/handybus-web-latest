import { ShuttleRouteType, TripType } from '@/types/shuttle.types';
import { compareToNow } from '@/utils/dateString';

export const checkIsEarlybird = (
  shuttleRoute: ShuttleRouteType | undefined,
) => {
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
  shuttleRoute: ShuttleRouteType | undefined,
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
  shuttleRoute: ShuttleRouteType | undefined,
) => {
  if (!shuttleRoute || !type) {
    return 0;
  }
  const isEarlybird = checkIsEarlybird(shuttleRoute);
  const price = isEarlybird
    ? type === 'ROUND_TRIP'
      ? shuttleRoute.earlybirdPriceRoundTrip
      : type === 'TO_DESTINATION'
        ? shuttleRoute.earlybirdPriceToDestination
        : shuttleRoute.earlybirdPriceFromDestination
    : getSinglePrice(type, shuttleRoute);
  return price;
};

export const generateCustomerKey = async (userId: number): Promise<string> => {
  const rawData = `HANDYBUS_USER_${userId}_TOSS_PAYMENTS_KEY`;
  const encoder = new TextEncoder();
  const data = encoder.encode(rawData);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64Hash = btoa(
    hashArray.map((b) => String.fromCharCode(b)).join(''),
  );

  return `USER_${userId}_${base64Hash
    .slice(0, 40)
    .replace(/[^A-Za-z0-9\-_=.@]/g, '_')}`;
};
