'use client';

import { PaymentsViewEntity } from '@/types/payment.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import ShuttleInfoSection from './sections/shuttle-info-section/ShuttleInfoSection';
import ReservationPersonInfoSection from './sections/ReservationPersonInfoSection';
import PriceSection from './sections/price-section/PriceSection';
import GuidelineSection from './sections/GuidelineSection';
import RefundSection from './sections/refund-section/RefundSection';
import { checkIsHandyParty } from '@/utils/handyParty.util';
import { EventsViewEntity } from '@/types/event.type';
import TitleSection from './sections/title-section/TitleSection';
import TicketSection from './sections/ticket-section/TicketSection';

interface Props {
  reservation: ReservationsViewEntity;
  payment: PaymentsViewEntity;
  event: EventsViewEntity;
}

const Content = ({ reservation, payment, event }: Props) => {
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

  const isHandyParty = checkIsHandyParty(shuttleRoute);
  const isReservationCanceled = reservation.reservationStatus === 'CANCEL';
  const isShuttleRouteEnded =
    shuttleRoute.status === 'ENDED' || shuttleRoute.status === 'INACTIVE';

  return (
    <main className="grow pb-16">
      {isHandyParty && (
        <div className="bg-basic-blue-100 py-8 text-center text-12 font-500 leading-[160%] text-basic-blue-400">
          예약하신 셔틀은 <span className="font-700">핸디팟</span>입니다. 탑승
          시 확인해주세요.
        </div>
      )}
      <TitleSection
        event={event}
        reservation={reservation}
        shuttleRoute={shuttleRoute}
      />
      <TicketSection
        reservation={reservation}
        shuttleRoute={shuttleRoute}
        isHandyParty={isHandyParty}
      />
      <ShuttleInfoSection
        reservation={reservation}
        shuttleRoute={shuttleRoute}
        toDestinationHub={toDestinationHub}
        fromDestinationHub={fromDestinationHub}
        isHandyParty={isHandyParty}
      />

      <ReservationPersonInfoSection
        name={reservation.userName || reservation.userNickname}
        phoneNumber={reservation.userPhoneNumber}
      />
      <PriceSection
        payment={payment}
        passengerCount={reservation.passengerCount}
        isReservationCanceled={isReservationCanceled}
      />
      <GuidelineSection />
      <RefundSection
        isCanceled={isReservationCanceled}
        isEnded={isShuttleRouteEnded}
        reservation={reservation}
      />
    </main>
  );
};

export default Content;
