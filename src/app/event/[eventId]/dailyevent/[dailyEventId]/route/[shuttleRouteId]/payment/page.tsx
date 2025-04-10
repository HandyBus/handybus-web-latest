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
import { calculatePriceOfTripType, getRemainingSeat } from '@/utils/event.util';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { CustomError } from '@/services/custom-error';
import { MAX_PASSENGER_COUNT } from '@/constants/common';
import { useGetUser } from '@/services/user.service';
import { UsersViewEntity } from '@/types/user.type';
import { useState } from 'react';

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

  const isLoading =
    !tripType ||
    !toDestinationHubId ||
    !fromDestinationHubId ||
    !passengerCount ||
    isEventLoading ||
    isShuttleRouteLoading ||
    isUserLoading;

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event && shuttleRoute && user && (
          <Content
            event={event}
            shuttleRoute={shuttleRoute}
            user={user}
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
  event: EventWithRoutesViewEntity;
  shuttleRoute: ShuttleRoutesViewEntity;
  user: UsersViewEntity;
  tripType: TripType;
  toDestinationHubId: string | null;
  fromDestinationHubId: string | null;
  passengerCount: number;
}

const Content = ({
  event,
  shuttleRoute,
  user,
  tripType,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
}: ContentProps) => {
  const [isHandyApplied, setIsHandyApplied] = useState(false);

  const remainingSeat = getRemainingSeat(shuttleRoute);
  const priceOfTripType = calculatePriceOfTripType(shuttleRoute);

  if (remainingSeat[tripType] < passengerCount) {
    throw new CustomError(404, '좌석이 부족합니다.');
  } else if (passengerCount === 0 || passengerCount > MAX_PASSENGER_COUNT) {
    throw new CustomError(404, '인원 수가 올바르지 않습니다.');
  }

  return (
    <main className="pb-100">
      <EventInfoSection event={event} />
      <ShuttleRouteInfoSection
        tripType={tripType}
        shuttleRoute={shuttleRoute}
        fromDestinationHubId={fromDestinationHubId}
        toDestinationHubId={toDestinationHubId}
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
      <CouponSection />
      <PriceSection />
      <PaymentSection />
      <BottomBar />
    </main>
  );
};
