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

  const { data: shuttleRoute, isLoading: isShuttleRouteLoading } =
    useGetShuttleRoute(eventId, dailyEventId, shuttleRouteId);

  const isLoading =
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
        <main className="pb-100">
          <EventInfoSection />
          <ShuttleRouteInfoSection />
          <ClientInfoSection />
          <HandySection />
          <CouponSection />
          <PriceSection />
          <PaymentSection />
          <BottomBar />
        </main>
      </DeferredSuspense>
    </>
  );
};

export default Page;
