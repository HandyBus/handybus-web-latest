'use client';

import { PaymentsViewEntity } from '@/types/payment.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import EventCard from './EventCard';
import ShuttleProgressSection from './sections/shuttle-progress-section/ShuttleProgressSection';
import useReservationProgress from '../../hooks/useReservationProgress';
import ShuttleInfoSection from './sections/shuttle-info-section/ShuttleInfoSection';
import ReservationPersonInfoSection from './sections/ReservationPersonInfoSection';
import HandySection from './sections/HandySection';
import PriceSection from './sections/price-section/PriceSection';
import GuidelineSection from './sections/GuidelineSection';
import RefundSection from './sections/RefundSection';

interface Props {
  reservation: ReservationsViewEntity;
  payment: PaymentsViewEntity;
  shuttleBus: ShuttleBusesViewEntity | null | undefined;
}

const Content = ({ reservation, payment, shuttleBus }: Props) => {
  const event = reservation.shuttleRoute.event;
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  );
  const shuttleRoute = reservation.shuttleRoute;
  const toDestinationHub =
    reservation.type !== 'FROM_DESTINATION'
      ? shuttleRoute.toDestinationShuttleRouteHubs?.find(
          (hub) =>
            hub.shuttleRouteHubId ===
            reservation.toDestinationShuttleRouteHubId,
        )
      : null;
  const fromDestinationHub =
    reservation.type !== 'TO_DESTINATION'
      ? shuttleRoute.fromDestinationShuttleRouteHubs?.find(
          (hub) =>
            hub.shuttleRouteHubId ===
            reservation.fromDestinationShuttleRouteHubId,
        )
      : null;

  const { reservationProgress, handyStatus, isOpenChatLinkCreated } =
    useReservationProgress({
      reservation,
      dailyEvent,
      shuttleBus,
    });

  return (
    <main className="grow pb-16">
      <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-22 font-700">
        예약 완료
      </h1>
      <EventCard event={event} />
      <ul className="flex flex-col gap-24">
        <Divider />
        <ShuttleProgressSection
          reservationProgress={reservationProgress}
          isOpenChatLinkCreated={isOpenChatLinkCreated}
          handyStatus={handyStatus}
          shuttleBus={shuttleBus}
        />
        <Divider />
        <ShuttleInfoSection
          tripType={reservation.type}
          toDestinationHub={toDestinationHub}
          fromDestinationHub={fromDestinationHub}
          shuttleRoute={shuttleRoute}
          passengerCount={reservation.passengerCount}
        />
        <Divider />
        <ReservationPersonInfoSection
          nickname={reservation.userNickname}
          phoneNumber={reservation.userPhoneNumber}
        />
        <Divider />
        <HandySection handyStatus={handyStatus} />
        <Divider />
        <PriceSection
          payment={payment}
          passengerCount={reservation.passengerCount}
        />
        <GuidelineSection />
        <RefundSection />
      </ul>
    </main>
  );
};

export default Content;

const Divider = () => {
  return <div className="h-8 w-full bg-basic-grey-50" />;
};
