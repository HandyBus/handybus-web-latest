'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import SuccessBusIcon from '../icons/bus-success.svg';
import {
  useGetUserReservation,
  useGetUserReservations,
} from '@/services/reservation.service';
import Loading from '@/components/loading/Loading';
import { HANDY_PARTY_PREFIX } from '@/constants/common';
import { useReservationTracking } from '@/hooks/analytics/useReservationTracking';
import { ReservationsViewEntity } from '@/types/reservation.type';

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

  if (isLoading) return <Loading />;
  if (isError || !data) throw new Error('예약 정보를 불러오는데 실패했습니다.');
  return (
    <PaymentsCompletedPage
      reservation={data.reservation}
      eventId={params.eventId}
    />
  );
};

interface PaymentsCompletedPageProps {
  reservation: ReservationsViewEntity;
  eventId: string;
}

const PaymentsCompletedPage = ({
  reservation,
  eventId,
}: PaymentsCompletedPageProps) => {
  const isHandyParty =
    reservation.shuttleRoute.name.includes(HANDY_PARTY_PREFIX);
  const dailyEventId = reservation.shuttleRoute.dailyEventId;
  const noticeRoomUrl = reservation.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
  )?.metadata?.openChatUrl;

  const eventName = reservation.shuttleRoute.event.eventName;

  const { executeTracking } = useCompleteReservationTracking({
    eventId,
    eventName,
    reservation,
    dailyEventId,
  });

  executeTracking();

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
            <br />
            모든 현장 안내는 공지방에서 전달드리니,
            <br />
            탑승 전 꼭 입장해 주세요.
          </p>
          <SuccessBusIcon />
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-8 p-16">
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              window.open(noticeRoomUrl, '_blank', 'noopener,noreferrer');
            }}
            disabled={!noticeRoomUrl}
          >
            공지방 입장하기
          </Button>
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
}

const useCompleteReservationTracking = ({
  eventId,
  eventName,
  reservation,
  dailyEventId,
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
  });

  // 완료 예약 추적 실행
  const executeTracking = () => {
    trackCompleteReservation(
      eventDate,
      selectedHubNameToDestination,
      selectedHubNameFromDestination,
      tripType,
      hasOtherEventReservation,
    );
  };

  return {
    executeTracking,
    trackingData: {
      eventDate,
      selectedHubNameToDestination,
      selectedHubNameFromDestination,
      tripType,
      hasOtherEventReservation,
    },
  };
};
