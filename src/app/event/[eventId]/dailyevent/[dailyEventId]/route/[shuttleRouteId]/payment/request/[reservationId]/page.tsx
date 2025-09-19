'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SuccessBusIcon from '../icons/bus-success.svg';
import {
  useGetUserReservation,
  useGetUserReservations,
} from '@/services/reservation.service';
import Loading from '@/components/loading/Loading';
import { HANDY_PARTY_PREFIX } from '@/constants/common';
import { useReservationTracking } from '@/hooks/analytics/useReservationTracking';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useEffect } from 'react';

interface Props {
  params: {
    eventId: string;
    reservationId: string;
  };
}

const PaymentsCompleted = ({ params }: Props) => {
  usePreventScroll();
  const { reservationId } = params;
  const { data, isLoading, isError } = useGetUserReservation(reservationId);
  const searchParams = useSearchParams();
  const reservationStartTime = searchParams.get('reservationStartTime');

  if (isLoading) return <Loading />;
  if (isError || !data) throw new Error('예약 정보를 불러오는데 실패했습니다.');
  return (
    <PaymentsCompletedPage
      reservation={data.reservation}
      eventId={params.eventId}
      reservationStartTime={reservationStartTime ?? undefined}
    />
  );
};

interface PaymentsCompletedPageProps {
  reservation: ReservationsViewEntity;
  eventId: string;
  reservationStartTime?: string;
}

const PaymentsCompletedPage = ({
  reservation,
  eventId,
  reservationStartTime,
}: PaymentsCompletedPageProps) => {
  const isHandyParty =
    reservation.shuttleRoute.name.includes(HANDY_PARTY_PREFIX);
  const dailyEventId = reservation.shuttleRoute.dailyEventId;

  const eventName = reservation.shuttleRoute.event.eventName;

  useCompleteReservationTracking({
    eventId,
    eventName,
    reservation,
    dailyEventId,
    reservationStartTime,
    paymentId: reservation.paymentId ?? undefined,
  });

  if (isHandyParty) {
    return (
      <main className="relative grow">
        <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
          <h1 className="pb-4 text-22 font-700">셔틀 예약이 완료되었어요</h1>
          <p className="pb-24 text-16 font-500 text-basic-grey-600">
            마이페이지에서 예약을 확인할 수 있어요.
          </p>
          <SuccessBusIcon />
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
          <Link href={`/event/${eventId}`}>
            <Button>완료</Button>
          </Link>
        </div>
      </main>
    );
  }
  return (
    <>
      <main className="relative grow">
        <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
          <h1 className="pb-4 text-22 font-700">셔틀 예약이 완료되었어요</h1>
          <p className="pb-24 text-center text-16 font-500 text-basic-grey-600">
            탑승권은 마이페이지에서 확인할 수 있습니다.
          </p>
          <SuccessBusIcon />
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
          <Link href={`/event/${eventId}`}>
            <Button variant="secondary">완료</Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default PaymentsCompleted;

// 커스텀 훅: 예약 완료 추적
interface UseCompleteReservationTrackingProps {
  eventId: string;
  eventName: string;
  reservation: ReservationsViewEntity;
  dailyEventId: string;
  reservationStartTime?: string;
  paymentId: string | undefined;
}

const useCompleteReservationTracking = ({
  eventId,
  eventName,
  reservation,
  dailyEventId,
  reservationStartTime,
  paymentId,
}: UseCompleteReservationTrackingProps) => {
  const eventDate = reservation.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
  )?.date;

  const tripType = reservation.type;

  const selectedHubToDestination = reservation.toDestinationShuttleRouteHubId;
  const selectedHubFromDestination =
    reservation.fromDestinationShuttleRouteHubId;

  const selectedHubNameToDestination =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubToDestination,
    )?.name;

  const selectedHubNameFromDestination =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
    )?.name;

  const { data: userReservations } = useGetUserReservations({
    eventProgressStatus: 'PAST',
  });

  const hasOtherEventReservation = userReservations?.some(
    (reservation) => reservation.shuttleRoute.eventId !== eventId,
  );

  const { trackCompleteReservation } = useReservationTracking({
    eventId,
    eventName,
    isBottomSheetOpen: false,
    reservationStartTime,
    initialStep: 'success_payment',
  });

  // 완료 예약 추적 실행 - hasOtherEventReservation이 결정되면 한 번 실행
  useEffect(() => {
    if (hasOtherEventReservation !== undefined) {
      trackCompleteReservation(
        eventDate,
        selectedHubNameToDestination,
        selectedHubNameFromDestination,
        tripType,
        hasOtherEventReservation,
        paymentId,
      );
    }
  }, [
    hasOtherEventReservation,
    trackCompleteReservation,
    eventDate,
    selectedHubNameToDestination,
    selectedHubNameFromDestination,
    tripType,
    paymentId,
  ]);

  return {
    trackingData: {
      eventDate,
      selectedHubNameToDestination,
      selectedHubNameFromDestination,
      tripType,
      hasOtherEventReservation,
    },
  };
};
