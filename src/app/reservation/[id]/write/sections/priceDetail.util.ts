import { IssuedCouponType } from '@/types/client.types';
import { ShuttleRouteType } from '@/types/shuttle.types';

interface totalPriceProps {
  currentShuttleData: ShuttleRouteType;
  tripType: { label: string; value: string };
  passengerCount: number;
}

export const totalEarlyBirdPrice = ({
  currentShuttleData,
  tripType,
  passengerCount = 1,
}: totalPriceProps) => {
  if (tripType.value === 'ROUND_TRIP')
    return currentShuttleData?.earlybirdPriceRoundTrip * passengerCount;
  if (tripType.value === 'TO_DESTINATION')
    return currentShuttleData?.earlybirdPriceToDestination * passengerCount;
  if (tripType.value === 'FROM_DESTINATION')
    return currentShuttleData?.earlybirdPriceFromDestination * passengerCount;
};

export const totalRegularPrice = ({
  currentShuttleData,
  tripType,
  passengerCount = 1,
}: totalPriceProps) => {
  if (tripType?.value === 'ROUND_TRIP')
    return currentShuttleData?.regularPriceRoundTrip * passengerCount;
  if (tripType?.value === 'TO_DESTINATION')
    return currentShuttleData?.regularPriceToDestination * passengerCount;
  if (tripType?.value === 'FROM_DESTINATION')
    return currentShuttleData?.regularPriceFromDestination * passengerCount;
};

const isEarlyBridSeason = (currentShuttleData: ShuttleRouteType) =>
  currentShuttleData?.earlybirdDeadline &&
  new Date(currentShuttleData?.earlybirdDeadline) > new Date();

// totalPrice 의 타입이 number | undefined 에서 number 만 반환되도록 수정필요.
export const totalPrice = ({
  currentShuttleData,
  tripType,
  passengerCount = 1,
}: totalPriceProps) => {
  if (isEarlyBridSeason(currentShuttleData)) {
    return totalEarlyBirdPrice({
      currentShuttleData,
      tripType,
      passengerCount,
    });
  }
  return totalRegularPrice({ currentShuttleData, tripType, passengerCount });
};

interface discountAmountProps {
  selectedCoupon: IssuedCouponType;
  currentShuttleData: ShuttleRouteType;
  passengerCount: number;
  tripType: { label: string; value: string };
}

export const discountAmount = ({
  selectedCoupon,
  currentShuttleData,
  passengerCount = 1,
  tripType,
}: discountAmountProps) => {
  const totalPriceResult = totalPrice({
    passengerCount,
    currentShuttleData,
    tripType,
  });
  if (!totalPriceResult) return undefined;
  if (selectedCoupon?.discountType === 'AMOUNT') {
    const applicablePeopleCount = Math.min(
      passengerCount,
      selectedCoupon?.maxApplicablePeople || passengerCount,
    );
    const discountableAmount =
      selectedCoupon?.discountAmount * applicablePeopleCount;
    return Math.floor(discountableAmount);
  }
  if (selectedCoupon?.discountType === 'RATE') {
    const applicablePeopleCount = Math.min(
      passengerCount,
      selectedCoupon?.maxApplicablePeople || passengerCount,
    );
    const percentizedDiscountRate = selectedCoupon?.discountRate / 100;
    const discountableAmount =
      Math.min(
        percentizedDiscountRate *
          (totalPrice({ currentShuttleData, tripType, passengerCount }) ?? 0),
        selectedCoupon?.maxDiscountAmount,
      ) * applicablePeopleCount;
    return Math.floor(discountableAmount);
  }
};

interface finalPriceProps {
  currentShuttleData: ShuttleRouteType;
  tripType: { label: string; value: string };
  passengerCount: number;
  selectedCoupon: IssuedCouponType;
}

export const finalPrice = ({
  currentShuttleData,
  tripType,
  passengerCount = 1,
  selectedCoupon,
}: finalPriceProps) => {
  if (!selectedCoupon) {
    return totalPrice({ currentShuttleData, tripType, passengerCount });
  }
  if (selectedCoupon?.discountType === 'AMOUNT') {
    const applicablePeopleCount = Math.min(
      passengerCount,
      selectedCoupon?.maxApplicablePeople || passengerCount,
    );
    const discountableAmount =
      selectedCoupon?.discountAmount * applicablePeopleCount; // 총 할인 가능 금액
    const wholePaymentPrice =
      totalPrice({ currentShuttleData, tripType, passengerCount }) ?? 0;
    const cappedDiscountAmount = Math.min(
      discountableAmount,
      wholePaymentPrice,
    );
    return Math.floor(wholePaymentPrice - cappedDiscountAmount);
  }
  if (selectedCoupon?.discountType === 'RATE') {
    const applicablePeopleCount = Math.min(
      passengerCount,
      selectedCoupon?.maxApplicablePeople || passengerCount,
    );
    const percentizedDiscountRate = selectedCoupon?.discountRate / 100;
    const discountableAmount =
      Math.min(
        percentizedDiscountRate *
          (totalPrice({ currentShuttleData, tripType, passengerCount }) ?? 0),
        selectedCoupon?.maxDiscountAmount,
      ) * applicablePeopleCount;
    const wholePaymentPrice =
      totalPrice({ currentShuttleData, tripType, passengerCount }) ?? 0;
    const cappedDiscountAmount = Math.min(
      discountableAmount,
      wholePaymentPrice,
    );
    return Math.floor(wholePaymentPrice - cappedDiscountAmount);
  }
};
