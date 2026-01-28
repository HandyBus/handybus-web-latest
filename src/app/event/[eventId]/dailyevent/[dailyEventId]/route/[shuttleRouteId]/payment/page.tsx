'use client';

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
import { useGetUser } from '@/services/user.service';
import { useGetUserCoupons } from '@/services/coupon.service';
import Content from './components/Content';
import { PAYMENT_PARAMS_KEYS } from './payment.const';
import { useMemo, useState } from 'react';
import TossPaymentsScript from '@/components/script/TossPaymentsScript';
import { MOCK_SHUTTLE_ROUTES } from '@/app/event/[eventId]/components/event-content/mock-shuttle-routes.const';
// import useCheckReferral from './hooks/useCheckReferral';

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
  const { data: shuttleRouteFromApi, isLoading: isShuttleRouteLoading } =
    useGetShuttleRoute(eventId, dailyEventId, shuttleRouteId);
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: coupons, isLoading: isCouponsLoading } = useGetUserCoupons({
    issuedCouponStatus: 'BEFORE_USE',
  });

  const shuttleRouteFromMock = MOCK_SHUTTLE_ROUTES[eventId].find(
    (route) => route.shuttleRouteId === shuttleRouteId,
  );

  const [isTossPaymentsScriptLoaded, setIsTossPaymentsScriptLoaded] =
    useState(false);

  // useCheckReferral({
  //   eventId,
  //   shuttleRouteId,
  //   referralCode,
  // });

  const isLoading =
    !tripType ||
    (!toDestinationHubId && !fromDestinationHubId) ||
    !passengerCount ||
    isEventLoading ||
    isShuttleRouteLoading ||
    isUserLoading ||
    isCouponsLoading ||
    !isTossPaymentsScriptLoaded;

  const shuttleRoute: ShuttleRoutesViewEntity | null = useMemo(() => {
    if (!shuttleRouteFromApi || !shuttleRouteFromMock) {
      return null;
    }

    return {
      ...shuttleRouteFromApi,
      regularPriceToDestination:
        shuttleRouteFromMock?.regularPriceToDestination ?? null,
      regularPriceFromDestination:
        shuttleRouteFromMock?.regularPriceFromDestination ?? null,
      regularPriceRoundTrip:
        shuttleRouteFromMock?.regularPriceRoundTrip ?? null,
      earlybirdPriceToDestination:
        shuttleRouteFromMock?.earlybirdPriceToDestination ?? null,
      earlybirdPriceFromDestination:
        shuttleRouteFromMock?.earlybirdPriceFromDestination ?? null,
      earlybirdPriceRoundTrip:
        shuttleRouteFromMock?.earlybirdPriceRoundTrip ?? null,
    };
  }, [shuttleRouteFromApi, shuttleRouteFromMock]);

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
