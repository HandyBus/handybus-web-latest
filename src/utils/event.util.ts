import { MAX_HANDY_DISCOUNT_AMOUNT } from '@/constants/common';
import { IssuedCouponsViewEntity } from '@/types/coupon.type';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { compareToNow } from '@/utils/dateString.util';

export type EventPhase = 'demand' | 'reservation';
export type EventEnabledStatus = 'enabled' | 'disabled';

export const getPhaseAndEnabledStatus = (
  event: EventWithRoutesViewEntity | null | undefined,
): {
  phase: EventPhase;
  enabledStatus: EventEnabledStatus;
} => {
  if (!event) {
    return { phase: 'demand', enabledStatus: 'disabled' };
  }
  const isDemandOver = event.eventStatus === 'CLOSED';
  const isReservationOpen = event.minRoutePrice !== null;
  const isReservationOngoing = event.hasOpenRoute;

  switch (true) {
    case !isDemandOver && !isReservationOpen:
      return { phase: 'demand', enabledStatus: 'enabled' };
    case isDemandOver && !isReservationOpen:
      return { phase: 'demand', enabledStatus: 'disabled' };
    case isReservationOpen && isReservationOngoing:
      return { phase: 'reservation', enabledStatus: 'enabled' };
    case isReservationOpen && !isReservationOngoing:
    default:
      return { phase: 'reservation', enabledStatus: 'disabled' };
  }
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

export type PriceOfTripType = {
  [tripType in TripType]: {
    isEarlybird: boolean;
    regularPrice: number;
    earlybirdPrice: number | null;
  };
};

export const calculatePriceOfTripType = (
  route: ShuttleRoutesViewEntity,
): PriceOfTripType => {
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

const calculateTotalEarlybirdDiscountAmount = ({
  priceOfTripType,
  tripType,
  passengerCount,
}: {
  priceOfTripType: PriceOfTripType;
  tripType: TripType;
  passengerCount: number;
}) => {
  const price = priceOfTripType[tripType];
  if (!price.isEarlybird) {
    return 0;
  }
  return (price.regularPrice - (price.earlybirdPrice ?? 0)) * passengerCount;
};

const calculateTotalCouponDiscountAmount = ({
  price,
  passengerCount,
  coupon,
}: {
  price: number;
  passengerCount: number;
  coupon: IssuedCouponsViewEntity;
}) => {
  const totalPrice = price * passengerCount;

  const cappedPassengersCount = coupon?.maxApplicablePeople
    ? Math.min(passengerCount, coupon.maxApplicablePeople)
    : passengerCount;

  const singleCouponDiscount = coupon
    ? coupon.discountType === 'RATE'
      ? ((coupon.discountRate ?? 0) / 100) * price
      : (coupon.discountAmount ?? 0)
    : 0;

  const totalCouponDiscount = Math.ceil(
    singleCouponDiscount * cappedPassengersCount,
  );

  const cappedTotalCouponDiscount = coupon?.maxDiscountAmount
    ? Math.min(totalCouponDiscount, totalPrice, coupon.maxDiscountAmount)
    : Math.min(totalCouponDiscount, totalPrice);

  return cappedTotalCouponDiscount;
};

export const calculateTotalPrice = ({
  priceOfTripType,
  tripType,
  passengerCount,
  coupon,
}: {
  priceOfTripType: PriceOfTripType;
  tripType: TripType;
  passengerCount: number;
  coupon: IssuedCouponsViewEntity | null;
}) => {
  const price = priceOfTripType[tripType];
  const totalPrice = price.regularPrice * passengerCount;

  const totalEarlybirdDiscountAmount = calculateTotalEarlybirdDiscountAmount({
    priceOfTripType,
    tripType,
    passengerCount,
  });
  const totalCouponDiscountAmount = coupon
    ? calculateTotalCouponDiscountAmount({
        price: price.regularPrice - totalEarlybirdDiscountAmount,
        passengerCount,
        coupon,
      })
    : 0;

  const finalPrice = Math.max(
    Math.floor(
      totalPrice - totalEarlybirdDiscountAmount - totalCouponDiscountAmount,
    ),
    0,
  );

  return {
    finalPrice,
    totalCouponDiscountAmount,
    totalEarlybirdDiscountAmount,
  };
};

export const calculateHandyDiscountAmount = (
  priceOfTripType: PriceOfTripType,
  tripType: TripType,
) => {
  const price = priceOfTripType[tripType];
  const priceWithEarlybirdDiscount = price.isEarlybird
    ? (price.earlybirdPrice ?? 0)
    : price.regularPrice;
  return Math.min(
    Math.ceil(priceWithEarlybirdDiscount * 0.5),
    MAX_HANDY_DISCOUNT_AMOUNT,
  );
};
