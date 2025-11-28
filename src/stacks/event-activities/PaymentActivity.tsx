'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Payment from '@/app/event/[eventId]/dailyevent/[dailyEventId]/route/[shuttleRouteId]/payment/Payment.content';
import { TripType } from '@/types/shuttleRoute.type';

interface Params {
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

const PaymentActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Payment
          eventId={params.eventId}
          dailyEventId={params.dailyEventId}
          shuttleRouteId={params.shuttleRouteId}
          tripType={params.tripType}
          toDestinationHubId={params.toDestinationHubId}
          fromDestinationHubId={params.fromDestinationHubId}
          passengerCount={params.passengerCount}
          desiredHubAddress={params.desiredHubAddress}
          desiredHubLatitude={params.desiredHubLatitude}
          desiredHubLongitude={params.desiredHubLongitude}
          reservationStartTime={params.reservationStartTime}
        />
      </div>
    </AppScreen>
  );
};

export default PaymentActivity;
