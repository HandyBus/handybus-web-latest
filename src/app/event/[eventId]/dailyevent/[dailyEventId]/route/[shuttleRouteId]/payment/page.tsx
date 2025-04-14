'use client';

import Header from '@/components/header/Header';
import EventInfoSection from './components/sections/EventInfoSection';
import ShuttleRouteInfoSection from './components/sections/ShuttleRouteInfoSection';
import ClientInfoSection from './components/sections/ClientInfoSection';
import HandySection from './components/sections/HandySection';
import CouponSection from './components/sections/CouponSection';
import PriceSection from './components/sections/PriceSection';
import BottomBar from './components/BottomBar';
import PaymentSection from './components/sections/PaymentSection';
import { useSearchParams } from 'next/navigation';
import {
  ShuttleRoutesViewEntity,
  TripType,
  TripTypeEnum,
} from '@/types/shuttleRoute.type';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetShuttleRoute } from '@/services/shuttleRoute.service';
import { useGetEvent } from '@/services/event.service';
import {
  calculatePriceOfTripType,
  getRemainingSeat,
  calculateTotalPrice,
} from '@/utils/event.util';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { CustomError } from '@/services/custom-error';
import { MAX_PASSENGER_COUNT } from '@/constants/common';
import { useGetUser } from '@/services/user.service';
import { UsersViewEntity } from '@/types/user.type';
import { useState } from 'react';
import { useGetUserCoupons } from '@/services/coupon.service';
import { IssuedCouponsViewEntity } from '@/types/coupon.type';

interface Props {
  params: {
    eventId: string;
    dailyEventId: string;
    shuttleRouteId: string;
  };
}
const Page = ({ params }: Props) => {
  const { eventId, dailyEventId, shuttleRouteId } = params;
  const searchParams = useSearchParams();
  const tripType = (() => {
    const tripType = searchParams.get('tripType');
    if (TripTypeEnum.options.includes(tripType as TripType)) {
      return tripType as TripType;
    }
    return 'ROUND_TRIP';
  })();
  const toDestinationHubId = searchParams.get('toDestinationHubId');
  const fromDestinationHubId = searchParams.get('fromDestinationHubId');
  const passengerCount = Number(searchParams.get('passengerCount'));

  const { data: event, isLoading: isEventLoading } = useGetEvent(eventId);
  const { data: shuttleRoute, isLoading: isShuttleRouteLoading } =
    useGetShuttleRoute(eventId, dailyEventId, shuttleRouteId);
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: coupons, isLoading: isCouponsLoading } = useGetUserCoupons({
    issuedCouponStatus: 'BEFORE_USE',
  });

  const isLoading =
    !tripType ||
    !toDestinationHubId ||
    !fromDestinationHubId ||
    !passengerCount ||
    isEventLoading ||
    isShuttleRouteLoading ||
    isUserLoading ||
    isCouponsLoading;

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event && shuttleRoute && user && coupons && (
          <Content
            event={event}
            shuttleRoute={shuttleRoute}
            user={user}
            coupons={coupons}
            tripType={tripType}
            toDestinationHubId={toDestinationHubId}
            fromDestinationHubId={fromDestinationHubId}
            passengerCount={passengerCount}
          />
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;

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

  if (remainingSeat[tripType] < passengerCount) {
    throw new CustomError(404, '좌석이 부족합니다.');
  } else if (passengerCount <= 0 || passengerCount > MAX_PASSENGER_COUNT) {
    throw new CustomError(404, '인원 수가 올바르지 않습니다.');
  }

  return (
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
      <HandySection
        user={user}
        tripType={tripType}
        priceOfTripType={priceOfTripType}
        isHandyApplied={isHandyApplied}
        setIsHandyApplied={setIsHandyApplied}
      />
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
      />
      <PaymentSection />
      <BottomBar />
    </main>
  );
};
