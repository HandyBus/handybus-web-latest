import { CustomError } from '@/services/custom-error';
import { IssuedCouponsViewEntity } from '@/types/coupon.type';
import { EventsViewEntity } from '@/types/event.type';
import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { compareToNow } from '@/utils/dateString.util';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { checkIsHandyParty } from '@/utils/handyParty.util';

export type EventPhase = 'standBy' | 'demand' | 'reservation';
export type EventEnabledStatus = 'enabled' | 'disabled';

export const getPhaseAndEnabledStatus = (
  event: EventsViewEntity | null | undefined,
): {
  phase: EventPhase;
  enabledStatus: EventEnabledStatus;
} => {
  if (!event) {
    return { phase: 'standBy', enabledStatus: 'disabled' };
  }
  const isStandBy = event.eventStatus === 'STAND_BY';
  const isDemandOngoing =
    event.eventStatus === 'OPEN' &&
    event.dailyEvents.some((dailyEvent) => dailyEvent.dailyEventIsDemandOpen);
  const isReservationOpen = event.eventMinRoutePrice !== null;
  const isReservationOngoing = event.eventHasOpenRoute;

  switch (true) {
    case isStandBy:
      return { phase: 'standBy', enabledStatus: 'disabled' };
    case isDemandOngoing && !isReservationOpen:
      return { phase: 'demand', enabledStatus: 'enabled' };
    case !isDemandOngoing && !isReservationOpen:
      return { phase: 'demand', enabledStatus: 'disabled' };
    case isReservationOpen && isReservationOngoing:
      return { phase: 'reservation', enabledStatus: 'enabled' };
    case isReservationOpen && !isReservationOngoing:
      return { phase: 'reservation', enabledStatus: 'disabled' };
    default:
      return { phase: 'standBy', enabledStatus: 'disabled' };
  }
};

// NOTE: 편도 노선 여부를 확인하는 함수.
// 현재는 방향별 정류장 존재 여부를 바탕으로 확인하지만, 과거 데이터 지원을 위해 가격을 바탕으로 확인하는 것 또한 유지.
export const checkExistingTripType = (route: ShuttleRoutesViewEntity) => {
  const toDestinationExists =
    route.toDestinationShuttleRouteHubs &&
    route.toDestinationShuttleRouteHubs.length > 0 &&
    route.regularPriceToDestination !== null &&
    route.regularPriceToDestination > 0;
  const fromDestinationExists =
    route.fromDestinationShuttleRouteHubs &&
    route.fromDestinationShuttleRouteHubs.length > 0 &&
    route.regularPriceFromDestination !== null &&
    route.regularPriceFromDestination > 0;
  const roundTripExists =
    route.regularPriceRoundTrip !== null && route.regularPriceRoundTrip > 0;
  return { toDestinationExists, fromDestinationExists, roundTripExists };
};

export interface RemainingSeat {
  ROUND_TRIP: number | null;
  TO_DESTINATION: number | null;
  FROM_DESTINATION: number | null;
}

export const getRemainingSeat = (
  route: ShuttleRoutesViewEntity,
): RemainingSeat => {
  const { toDestinationExists, fromDestinationExists, roundTripExists } =
    checkExistingTripType(route);
  const {
    isReservationDisabledToDestination,
    isReservationDisabledFromDestination,
    isReservationDisabledRoundTrip,
  } = route;
  const maxSeatCount = route.maxPassengerCount ?? 0;
  const toDestinationCount = toDestinationExists
    ? isReservationDisabledToDestination
      ? 0
      : maxSeatCount - (route.toDestinationCount ?? 0)
    : null;
  const fromDestinationCount = fromDestinationExists
    ? isReservationDisabledFromDestination
      ? 0
      : maxSeatCount - (route.fromDestinationCount ?? 0)
    : null;
  const roundTripCount = roundTripExists
    ? isReservationDisabledRoundTrip
      ? 0
      : Math.min(
          maxSeatCount - (route.toDestinationCount ?? 0),
          maxSeatCount - (route.fromDestinationCount ?? 0),
        )
    : null;

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
    case remainingSeat.ROUND_TRIP !== null && remainingSeat.ROUND_TRIP > 0:
      return { type: 'ROUND_TRIP', count: remainingSeat.ROUND_TRIP ?? 0 };
    case remainingSeat.TO_DESTINATION && remainingSeat.TO_DESTINATION > 0:
      return {
        type: 'TO_DESTINATION',
        count: remainingSeat.TO_DESTINATION ?? 0,
      };
    case remainingSeat.FROM_DESTINATION && remainingSeat.FROM_DESTINATION > 0:
      return {
        type: 'FROM_DESTINATION',
        count: remainingSeat.FROM_DESTINATION ?? 0,
      };
    default:
      return null;
  }
};

export const checkIsSoldOut = (remainingSeat: RemainingSeat) => {
  return (
    (remainingSeat.ROUND_TRIP === null || remainingSeat.ROUND_TRIP === 0) &&
    (remainingSeat.TO_DESTINATION === null ||
      remainingSeat.TO_DESTINATION === 0) &&
    (remainingSeat.FROM_DESTINATION === null ||
      remainingSeat.FROM_DESTINATION === 0)
  );
};

export type PriceOfTripType = {
  [tripType in TripType]: {
    isEarlybird: boolean;
    regularPrice: number | null;
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
  if (!price.isEarlybird || !price.regularPrice || !price.earlybirdPrice) {
    return 0;
  }
  return (price.regularPrice - price.earlybirdPrice) * passengerCount;
};

const calculateTotalCheerCampaignDiscountAmount = ({
  price,
  passengerCount,
  cheerCampaignFinalDiscountRate,
}: {
  price: number;
  passengerCount: number;
  cheerCampaignFinalDiscountRate: number | null;
}) => {
  if (!cheerCampaignFinalDiscountRate) {
    return 0;
  }
  const totalPrice = price * passengerCount;

  const totalCheerCampaignDiscount = Math.floor(
    totalPrice * (cheerCampaignFinalDiscountRate / 100),
  );
  return totalCheerCampaignDiscount;
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
  cheerCampaignFinalDiscountRate,
  hasReferralCode,
}: {
  priceOfTripType: PriceOfTripType;
  tripType: TripType;
  passengerCount: number;
  coupon: IssuedCouponsViewEntity | null;
  cheerCampaignFinalDiscountRate: number | null;
  hasReferralCode: boolean;
}) => {
  const price = priceOfTripType[tripType];

  if (price.regularPrice === null || price.regularPrice === undefined) {
    throw new CustomError(400, '가격이 존재하지 않는 상품입니다.');
  }

  const totalPrice = price.regularPrice * passengerCount;

  // TODO: 더 명시적으로 리팩토링
  const totalEarlybirdDiscountAmount = calculateTotalEarlybirdDiscountAmount({
    priceOfTripType,
    tripType,
    passengerCount,
  });
  const totalCheerCampaignDiscountAmount =
    calculateTotalCheerCampaignDiscountAmount({
      price: price.regularPrice - totalEarlybirdDiscountAmount / passengerCount,
      passengerCount,
      cheerCampaignFinalDiscountRate,
    });
  const totalCouponDiscountAmount = coupon
    ? calculateTotalCouponDiscountAmount({
        price:
          (price.regularPrice -
            totalEarlybirdDiscountAmount -
            totalCheerCampaignDiscountAmount) /
          passengerCount,
        passengerCount,
        coupon,
      })
    : 0;

  // TODO: 중요!!!! 추후 리퍼럴을 다시 이용할 때에는 여기 금액을 실제 api 상의 리퍼럴 할인 금액으로 반영해두어야함
  const REFERRAL_DISCOUNT_AMOUNT = 1000;
  const referralDiscountAmount = hasReferralCode ? REFERRAL_DISCOUNT_AMOUNT : 0;

  const finalPrice = Math.max(
    Math.floor(
      totalPrice -
        totalEarlybirdDiscountAmount -
        totalCheerCampaignDiscountAmount -
        totalCouponDiscountAmount -
        referralDiscountAmount,
    ),
    0,
  );

  return {
    finalPrice,
    totalCouponDiscountAmount,
    totalEarlybirdDiscountAmount,
    totalCheerCampaignDiscountAmount,
    referralDiscountAmount,
  };
};

export const getHubText = (reservation: ReservationsViewEntity) => {
  const toDestinationStartHub =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) =>
        hub.shuttleRouteHubId === reservation.toDestinationShuttleRouteHubId,
    );
  const toDestinationEndHub =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.role === 'DESTINATION',
    );
  const fromDestinationStartHub =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.role === 'DESTINATION',
    );
  const fromDestinationEndHub =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) =>
        hub.shuttleRouteHubId === reservation.fromDestinationShuttleRouteHubId,
    );

  const isHandyParty = checkIsHandyParty(reservation.shuttleRoute);

  let hubText = '';
  if (isHandyParty) {
    const desiredHubAddress =
      reservation.metadata?.desiredHubAddress ?? '[집앞하차]';
    if (reservation.type === 'TO_DESTINATION') {
      hubText = `${desiredHubAddress} → ${toDestinationEndHub?.name}`;
    } else if (reservation.type === 'FROM_DESTINATION') {
      hubText = `${fromDestinationStartHub?.name} → ${desiredHubAddress}`;
    }
  } else {
    if (reservation.type === 'TO_DESTINATION') {
      hubText = `${toDestinationStartHub?.name} → ${toDestinationEndHub?.name}`;
    } else if (reservation.type === 'FROM_DESTINATION') {
      hubText = `${fromDestinationStartHub?.name} → ${fromDestinationEndHub?.name}`;
    } else {
      if (
        toDestinationStartHub?.regionHubId ===
        fromDestinationEndHub?.regionHubId
      ) {
        hubText = `${toDestinationStartHub?.name} ↔ ${toDestinationEndHub?.name}`;
      } else {
        hubText = `${toDestinationStartHub?.name} → ${toDestinationEndHub?.name} → ${fromDestinationEndHub?.name}`;
      }
    }
  }

  return hubText;
};
