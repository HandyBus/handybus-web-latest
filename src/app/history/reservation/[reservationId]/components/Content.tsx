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
import ReservationTransferSection from './sections/reservation-transfer-section/ReservationTransferSection';
import { ReservationTransferRequestsEntity } from '@/types/reservationTransferRequest.type';

interface Props {
  reservation: ReservationsViewEntity;
  payment: PaymentsViewEntity;
  event: EventsViewEntity;
  reservationTransferRequests: ReservationTransferRequestsEntity[];
}

const Content = ({
  reservation,
  payment,
  event,
  reservationTransferRequests,
}: Props) => {
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
  const isTransferredReservation =
    reservation.originalUserId !== reservation.userId;

  return (
    <main className="grow pb-16">
      {isTransferredReservation && (
        <div className="bg-basic-grey-50 py-8 text-center text-14 font-600 leading-[160%] text-basic-grey-600">
          선물 받은 탑승권이에요.
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
        isTransferredReservation={isTransferredReservation}
      />

      <ReservationTransferSection
        isTransferredReservation={isTransferredReservation}
        reservation={reservation}
        reservationTransferRequests={reservationTransferRequests}
      />
      <GuidelineSection />
      <RefundSection
        isTransferredReservation={isTransferredReservation}
        isCanceled={isReservationCanceled}
        isEnded={isShuttleRouteEnded}
        reservation={reservation}
      />
    </main>
  );
};

export default Content;
