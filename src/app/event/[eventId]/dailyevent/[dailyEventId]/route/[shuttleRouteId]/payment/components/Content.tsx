import { IssuedCouponsViewEntity } from '@/types/coupon.type';
import { EventsViewEntity } from '@/types/event.type';
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
// import CouponSection from './sections/CouponSection';
import PriceSection from './sections/PriceSection';
// import PaymentSection from './sections/PaymentSection';
import BottomBar from './BottomBar';
import useTossPayments from '@/hooks/useTossPayments';
import { postPreparePayment } from '@/services/payment.service';
import { postReserveReservation } from '@/services/payment.service';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useReservationTracking } from '@/hooks/analytics/useReservationTracking';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import GuidelineSection from './sections/GuidelineSection';
import { PAYMENT_PARAMS_KEYS } from '../payment.const';
// import ReferralDiscountNotice from './ReferralDiscountNotice';

interface ContentProps {
  tripType: TripType;
  toDestinationHubId: string | null;
  fromDestinationHubId: string | null;
  passengerCount: number;
  event: EventsViewEntity;
  shuttleRoute: ShuttleRoutesViewEntity;
  user: UsersViewEntity;
  coupons: IssuedCouponsViewEntity[];
  isHandyParty: boolean;
  desiredHubAddress?: string;
  desiredHubLatitude?: number;
  desiredHubLongitude?: number;
  reservationStartTime?: string;
  referralCode?: string;
}

const Content = ({
  tripType,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
  event,
  shuttleRoute,
  user,
  // coupons,
  isHandyParty,
  desiredHubAddress,
  desiredHubLatitude,
  desiredHubLongitude,
  reservationStartTime,
  referralCode,
}: ContentProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [selectedCoupon] = useState<IssuedCouponsViewEntity | null>(null);

  const remainingSeat = getRemainingSeat(shuttleRoute);
  const priceOfTripType = calculatePriceOfTripType(shuttleRoute);
  const regularPrice = priceOfTripType[tripType].regularPrice;
  const {
    finalPrice,
    totalEarlybirdDiscountAmount,
    totalCouponDiscountAmount,
    // referralDiscountAmount,
  } = calculateTotalPrice({
    priceOfTripType,
    tripType,
    passengerCount,
    coupon: selectedCoupon,
    // hasReferralCode: !!referralCode,
  });

  const {
    // isDisabled: isTossPaymentsDisabled,
    requestPayment,
    changePrice,
  } = useTossPayments({
    userId: user.userId,
    initialPrice: finalPrice,
  });

  const [isGuidelineSeen, setIsGuidelineSeen] = useState(false);

  useEffect(() => {
    changePrice(finalPrice);
  }, [changePrice, finalPrice]);

  // 예약 추적 훅
  const { markAsIntentionalNavigation } = useReservationTracking({
    eventId: event.eventId,
    eventName: event.eventName,
    isBottomSheetOpen: false, // 결제 페이지에서는 바텀시트 없음
    isActive: true,
    reservationStartTime,
    initialStep: 'payment',
  });

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const submitPayment = async () => {
    if (!isGuidelineSeen) {
      toast.error('유의사항을 확인해주세요.');
      scrollToBottom();
      return;
    }
    try {
      const parsedFormValues = {
        shuttleRouteId: shuttleRoute.shuttleRouteId,
        type: tripType,
        toDestinationShuttleRouteHubId:
          tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION'
            ? (toDestinationHubId ?? undefined)
            : undefined,
        fromDestinationShuttleRouteHubId:
          tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION'
            ? (fromDestinationHubId ?? undefined)
            : undefined,
        isSupportingHandy: false, // NOTE : api 에서 핸디 지원 옵션 제거 여부에 따라 제거 필요
        passengerCount,
        desiredHubAddress,
        desiredHubLatitude,
        desiredHubLongitude,
      };
      const postReservationResponse =
        await postReserveReservation(parsedFormValues);

      const readyPaymentFormValues = {
        reservationId: postReservationResponse.reservationId,
        issuedCouponId: selectedCoupon?.issuedCouponId ?? null,
        referralCode: referralCode ?? null,
      };
      const readyPaymentResponse = await postPreparePayment(
        readyPaymentFormValues,
      );

      const baseUrl = window.location.origin + pathname;
      const successUrl = `${baseUrl}/request?reservationId=${postReservationResponse.reservationId}${reservationStartTime ? `&${PAYMENT_PARAMS_KEYS.reservationStartTime}=${reservationStartTime}` : ''}`;
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

      // if (finalPrice === 0) {
      // NOTE: 토스페이먼츠 오류로 인해 0원 결제로 진행하는 코드. 추후 삭제 요망.
      if (true) {
        router.push(successUrl + '&orderId=' + readyPaymentResponse.paymentId);
        return;
      }

      await requestPayment({
        orderId: readyPaymentResponse.paymentId,
        orderName,
        successUrl,
        failUrl,
        onError,
        markAsIntentionalNavigation,
      });
    } catch (e) {
      const error = e as CustomError;
      Sentry.captureException(error, {
        tags: {
          component: 'PaymentContent',
          page: 'payment',
          feature: 'payment',
          action: 'request-payment',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          eventId: event.eventId,
          shuttleRouteId: shuttleRoute.shuttleRouteId,
          tripType,
          passengerCount,
          finalPrice: finalPrice,
          couponId: selectedCoupon?.issuedCouponId,
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(error);
      if (error.statusCode === 403) {
        toast.error('예약이 마감되었어요.');
        return;
      }
      // ReferralCode 중복사용 케이스 대응
      if (
        error.statusCode === 400 &&
        error.message.includes('이미 사용한 리퍼럴입니다.')
      ) {
        toast.error('이미 할인 받은 초대 링크입니다.');
        return;
      }
      // ReferralCode 자신의 초대 링크 사용 케이스 대응
      if (
        error.statusCode === 400 &&
        error.message.includes('You cannot use your own referral')
      ) {
        toast.error('자신의 초대 링크는 사용할 수 없습니다.');
        return;
      }
      toast.error('결제에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  // 에러 처리
  if (
    remainingSeat[tripType] === null ||
    (remainingSeat[tripType] ?? 0) < passengerCount
  ) {
    toast.error('남은 좌석이 없습니다.');
    router.replace(`/event/${event.eventId}`);
    return;
  } else if (passengerCount <= 0 || passengerCount > MAX_PASSENGER_COUNT) {
    throw new CustomError(404, '인원 수가 올바르지 않습니다.');
  } else if (regularPrice === null || regularPrice === undefined) {
    throw new CustomError(404, '가격이 존재하지 않는 상품입니다.');
  }

  return (
    <main className="pb-100">
      {/* {referralCode && <ReferralDiscountNotice />} */}
      {isHandyParty && (
        <div className="bg-basic-blue-100 py-8 text-center text-12 font-500 leading-[160%] text-basic-blue-400">
          예약 중인 셔틀은 <span className="font-700">핸디팟</span>입니다.
          승하차 위치를 꼭 확인하세요.
        </div>
      )}
      <EventInfoSection event={event} />
      <ShuttleRouteInfoSection
        eventId={event.eventId}
        tripType={tripType}
        shuttleRoute={shuttleRoute}
        toDestinationHubId={toDestinationHubId}
        fromDestinationHubId={fromDestinationHubId}
        passengerCount={passengerCount}
        isHandyParty={isHandyParty}
        desiredHubAddress={desiredHubAddress}
      />
      <ClientInfoSection user={user} />
      {/* <CouponSection
        eventId={event.eventId}
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        setSelectedCoupon={setSelectedCoupon}
      /> */}
      <PriceSection
        tripType={tripType}
        regularPrice={regularPrice}
        finalPrice={finalPrice}
        totalCouponDiscountAmount={totalCouponDiscountAmount}
        totalEarlybirdDiscountAmount={totalEarlybirdDiscountAmount}
        // referralDiscountAmount={referralDiscountAmount}
        passengerCount={passengerCount}
      />
      {/* <PaymentSection /> */}
      <div className="m-16 rounded-6 bg-basic-grey-50 py-12 text-center text-20 font-600">
        <span className="text-14 text-basic-black">
          아래 계좌로 입금해주세요.
        </span>{' '}
        <br />
        <span className="text-16 text-basic-black underline underline-offset-2">
          3333345010668 카카오뱅크
        </span>
      </div>
      <GuidelineSection
        isHandyParty={isHandyParty}
        guidelineSeen={isGuidelineSeen}
        setGuidelineSeen={setIsGuidelineSeen}
      />

      <BottomBar
        // isDisabled={isTossPaymentsDisabled}
        isDisabled={false}
        finalPrice={finalPrice}
        onSubmit={submitPayment}
      />
    </main>
  );
};

export default Content;
