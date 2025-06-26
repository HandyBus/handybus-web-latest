import { IssuedCouponsViewEntity } from '@/types/coupon.type';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { ShuttleRoutesViewEntity, TripType } from '@/types/shuttleRoute.type';
import { useEffect, useState } from 'react';
import { UsersViewEntity } from '@/types/user.type';
import { calculateTotalPrice } from '@/utils/event.util';
import { calculatePriceOfTripType } from '@/utils/event.util';
import { getRemainingSeat } from '@/utils/event.util';
import { CustomError } from '@/services/custom-error';
import { MAX_PASSENGER_COUNT } from '@/constants/common';
import EventInfoSection from './sections/EventInfoSection';
import ShuttleRouteInfoSection from './sections/ShuttleRouteInfoSection';
import ClientInfoSection from './sections/ClientInfoSection';
import HandySection from './sections/HandySection';
import CouponSection from './sections/CouponSection';
import PriceSection from './sections/PriceSection';
import PaymentSection from './sections/PaymentSection';
import BottomBar from './BottomBar';
import useTossPayments from '@/hooks/useTossPayments';
import { postPreparePayment } from '@/services/payment.service';
import { postReserveReservation } from '@/services/payment.service';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

const TAXI_HUB_PREFIX = process.env.NEXT_PUBLIC_TAXI_HUB_NAME;

interface ContentProps {
  tripType: TripType;
  toDestinationHubId: string | null;
  fromDestinationHubId: string | null;
  passengerCount: number;
  event: EventWithRoutesViewEntity;
  shuttleRoute: ShuttleRoutesViewEntity;
  user: UsersViewEntity;
  coupons: IssuedCouponsViewEntity[];
}

const Content = ({
  tripType,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
  event,
  shuttleRoute,
  user,
  coupons,
}: ContentProps) => {
  const pathname = usePathname();

  const [isHandyApplied, setIsHandyApplied] = useState(false);
  const [selectedCoupon, setSelectedCoupon] =
    useState<IssuedCouponsViewEntity | null>(null);

  const remainingSeat = getRemainingSeat(shuttleRoute);
  const priceOfTripType = calculatePriceOfTripType(shuttleRoute);
  const regularPrice = priceOfTripType[tripType].regularPrice;
  const {
    finalPrice,
    totalEarlybirdDiscountAmount,
    totalCouponDiscountAmount,
  } = calculateTotalPrice({
    priceOfTripType,
    tripType,
    passengerCount,
    coupon: selectedCoupon,
  });

  const { TossPaymentsScript, isDisabled, requestPayment, changePrice } =
    useTossPayments({
      userId: user.userId,
      initialPrice: finalPrice,
    });

  useEffect(() => {
    changePrice(finalPrice);
  }, [changePrice, finalPrice]);

  const submitPayment = async () => {
    try {
      const parsedFormValues = {
        shuttleRouteId: shuttleRoute.shuttleRouteId,
        type: tripType,
        toDestinationShuttleRouteHubId: toDestinationHubId ?? undefined,
        fromDestinationShuttleRouteHubId: fromDestinationHubId ?? undefined,
        isSupportingHandy: isHandyApplied,
        passengerCount,
      };
      const postReservationResponse =
        await postReserveReservation(parsedFormValues);

      const readyPaymentFormValues = {
        reservationId: postReservationResponse.reservationId,
        issuedCouponId: selectedCoupon?.issuedCouponId ?? null,
      };
      const readyPaymentResponse = await postPreparePayment(
        readyPaymentFormValues,
      );

      const baseUrl = window.location.origin + pathname;
      const successUrl = `${baseUrl}/request?reservationId=${postReservationResponse.reservationId}`;
      const failUrl = `${baseUrl}/request/fail`;
      const orderName =
        `[${shuttleRoute.name}] ${shuttleRoute.event.eventName}`.slice(0, 99);

      const onError = (error: CustomError) => {
        if (error.statusCode === 403) {
          toast.error('예약이 마감되었어요.');
          return;
        }
        toast.error('잠시 후 다시 시도해 주세요.');
      };

      await requestPayment({
        orderId: readyPaymentResponse.paymentId,
        orderName,
        successUrl,
        failUrl,
        onError,
      });
    } catch (error) {
      console.error(error);
      toast.error('결제에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  // TODO: 임시로 핸디팟 노선 처리
  const isTaxiRoute =
    !!TAXI_HUB_PREFIX &&
    (shuttleRoute.toDestinationShuttleRouteHubs?.some((hub) =>
      hub.name?.includes(TAXI_HUB_PREFIX),
    ) ||
      shuttleRoute.fromDestinationShuttleRouteHubs?.some((hub) =>
        hub.name?.includes(TAXI_HUB_PREFIX),
      ));

  // 에러 처리
  if (remainingSeat[tripType] < passengerCount) {
    throw new CustomError(404, '좌석이 부족합니다.');
  } else if (passengerCount <= 0 || passengerCount > MAX_PASSENGER_COUNT) {
    throw new CustomError(404, '인원 수가 올바르지 않습니다.');
  } else if (!regularPrice) {
    throw new CustomError(404, '가격이 존재하지 않는 상품입니다.');
  }

  return (
    <>
      <TossPaymentsScript />
      <main className="pb-100">
        <EventInfoSection event={event} />
        <ShuttleRouteInfoSection
          tripType={tripType}
          shuttleRoute={shuttleRoute}
          toDestinationHubId={toDestinationHubId}
          fromDestinationHubId={fromDestinationHubId}
          passengerCount={passengerCount}
        />
        <ClientInfoSection user={user} />
        {!isTaxiRoute && ( // NOTE: 핸디팟인경우 임시로 핸디섹션 비활성화
          <HandySection
            user={user}
            tripType={tripType}
            priceOfTripType={priceOfTripType}
            isHandyApplied={isHandyApplied}
            setIsHandyApplied={setIsHandyApplied}
          />
        )}
        <CouponSection
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          setSelectedCoupon={setSelectedCoupon}
        />
        <PriceSection
          regularPrice={regularPrice}
          finalPrice={finalPrice}
          totalCouponDiscountAmount={totalCouponDiscountAmount}
          totalEarlybirdDiscountAmount={totalEarlybirdDiscountAmount}
          passengerCount={passengerCount}
          isHandyApplied={isHandyApplied}
        />
        <PaymentSection />
        <BottomBar
          isDisabled={isDisabled}
          finalPrice={finalPrice}
          onSubmit={submitPayment}
        />
      </main>
    </>
  );
};

export default Content;
