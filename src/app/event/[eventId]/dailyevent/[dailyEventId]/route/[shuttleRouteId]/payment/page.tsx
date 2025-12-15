'use client';

import { useSearchParams } from 'next/navigation';
import { TripType, TripTypeEnum } from '@/types/shuttleRoute.type';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetShuttleRoute } from '@/services/shuttleRoute.service';
import { useGetEvent } from '@/services/event.service';
import { useGetUser } from '@/services/user.service';
import { useGetUserCoupons } from '@/services/coupon.service';
import Content from './components/Content';
import { PAYMENT_PARAMS_KEYS } from './payment.const';
import { useState } from 'react';
import TossPaymentsScript from '@/components/script/TossPaymentsScript';

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
    const tripType = searchParams.get(PAYMENT_PARAMS_KEYS.tripType);
    if (TripTypeEnum.options.includes(tripType as TripType)) {
      return tripType as TripType;
    }
    return 'ROUND_TRIP';
  })();
  const toDestinationHubId = searchParams.get(
    PAYMENT_PARAMS_KEYS.toDestinationHubId,
  );
  const fromDestinationHubId = searchParams.get(
    PAYMENT_PARAMS_KEYS.fromDestinationHubId,
  );
  const passengerCount = Number(
    searchParams.get(PAYMENT_PARAMS_KEYS.passengerCount),
  );
  const desiredHubAddress = searchParams.get(
    PAYMENT_PARAMS_KEYS.desiredHubAddress,
  );
  const desiredHubLatitude = Number(
    searchParams.get(PAYMENT_PARAMS_KEYS.desiredHubLatitude),
  );
  const desiredHubLongitude = Number(
    searchParams.get(PAYMENT_PARAMS_KEYS.desiredHubLongitude),
  );
  const reservationStartTime = searchParams.get(
    PAYMENT_PARAMS_KEYS.reservationStartTime,
  );
  const referralCode =
    searchParams.get(PAYMENT_PARAMS_KEYS.referralCode) ?? undefined;

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
              referralCode={referralCode}
            />
          )}
      </DeferredSuspense>
    </>
  );
};

export default Page;
