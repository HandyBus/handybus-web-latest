'use client';

import Header from '@/components/header/Header';
import { useSearchParams } from 'next/navigation';
import { TripType, TripTypeEnum } from '@/types/shuttleRoute.type';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetShuttleRoute } from '@/services/shuttleRoute.service';
import { useGetEvent } from '@/services/event.service';
import { useGetUser } from '@/services/user.service';
import { useGetUserCoupons } from '@/services/coupon.service';
import Content from './components/Content';

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
