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
import { TripType, TripTypeEnum } from '@/types/shuttleRoute.type';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetShuttleRoute } from '@/services/shuttleRoute.service';
import { useGetEvent } from '@/services/event.service';

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

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event && shuttleRoute && (
          <main className="pb-100">
            <EventInfoSection event={event} />
            <ShuttleRouteInfoSection />
            <ClientInfoSection />
            <HandySection />
            <CouponSection />
            <PriceSection />
            <PaymentSection />
            <BottomBar />
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;
