'use client';

import { TripType } from '@/types/shuttleRoute.type';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetShuttleRoute } from '@/services/shuttleRoute.service';
import { useGetEvent } from '@/services/event.service';
import { useGetUser } from '@/services/user.service';
import { useGetUserCoupons } from '@/services/coupon.service';
import Content from './components/Content';
import { useState } from 'react';
import TossPaymentsScript from '@/components/script/TossPaymentsScript';
import Header from '@/components/header/Header';

interface Props {
  eventId: string;
  dailyEventId: string;
  shuttleRouteId: string;
  tripType: TripType;
  toDestinationHubId: string | null;
  fromDestinationHubId: string | null;
  passengerCount: number;
  desiredHubAddress: string | null;
  desiredHubLatitude: number | null;
  desiredHubLongitude: number | null;
  reservationStartTime: string | null;
}

const Payment = ({
  eventId,
  dailyEventId,
  shuttleRouteId,
  tripType,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
  desiredHubAddress,
  desiredHubLatitude,
  desiredHubLongitude,
  reservationStartTime,
}: Props) => {
  const isHandyParty = Boolean(
    desiredHubAddress && desiredHubLatitude && desiredHubLongitude,
  );

  const { data: event, isLoading: isEventLoading } = useGetEvent(eventId);
  const { data: shuttleRoute, isLoading: isShuttleRouteLoading } =
    useGetShuttleRoute(eventId, dailyEventId, shuttleRouteId);
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: coupons, isLoading: isCouponsLoading } = useGetUserCoupons({
    issuedCouponStatus: 'BEFORE_USE',
  });

  const [isTossPaymentsScriptLoaded, setIsTossPaymentsScriptLoaded] =
    useState(false);

  const isLoading =
    !tripType ||
    (!toDestinationHubId && !fromDestinationHubId) ||
    !passengerCount ||
    isEventLoading ||
    isShuttleRouteLoading ||
    isUserLoading ||
    isCouponsLoading ||
    !isTossPaymentsScriptLoaded;

  return (
    <>
      <Header />
      <TossPaymentsScript onReady={() => setIsTossPaymentsScriptLoaded(true)} />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event &&
          shuttleRoute &&
          user &&
          coupons &&
          isTossPaymentsScriptLoaded && (
            <Content
              event={event}
              shuttleRoute={shuttleRoute}
              user={user}
              coupons={coupons}
              tripType={tripType}
              toDestinationHubId={toDestinationHubId}
              fromDestinationHubId={fromDestinationHubId}
              passengerCount={passengerCount}
              isHandyParty={isHandyParty}
              desiredHubAddress={desiredHubAddress ?? undefined}
              desiredHubLatitude={desiredHubLatitude ?? undefined}
              desiredHubLongitude={desiredHubLongitude ?? undefined}
              reservationStartTime={reservationStartTime ?? undefined}
            />
          )}
      </DeferredSuspense>
    </>
  );
};

export default Payment;
