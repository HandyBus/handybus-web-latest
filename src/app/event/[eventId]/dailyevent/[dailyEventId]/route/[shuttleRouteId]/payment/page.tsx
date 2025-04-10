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
import { getRemainingSeat } from '@/utils/event.util';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { CustomError } from '@/services/custom-error';
import { MAX_PASSENGER_COUNT } from '@/constants/common';

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

  const isLoading =
    isEventLoading ||
    isShuttleRouteLoading ||
    !tripType ||
    !toDestinationHubId ||
    !fromDestinationHubId ||
    !passengerCount;

  console.log(shuttleRoute);

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event && shuttleRoute && (
          <Content
            event={event}
            shuttleRoute={shuttleRoute}
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
  tripType: TripType;
  toDestinationHubId: string | null;
  fromDestinationHubId: string | null;
  passengerCount: number;
}

const Content = ({
  event,
  shuttleRoute,
  tripType,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
}: ContentProps) => {
  const remainingSeat = getRemainingSeat(shuttleRoute);

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
      <ClientInfoSection />
      <HandySection />
      <CouponSection />
      <PriceSection />
      <PaymentSection />
      <BottomBar />
    </main>
  );
};
