'use client';

import { PaymentsViewEntity } from '@/types/payment.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import ShuttleInfoSection from './sections/shuttle-info-section/ShuttleInfoSection';
import ReservationPersonInfoSection from './sections/ReservationPersonInfoSection';
import PriceSection from './sections/price-section/PriceSection';
import GuidelineSection from './sections/GuidelineSection';
// import RefundSection from './sections/refund-section/RefundSection';
import { checkIsHandyParty } from '@/utils/handyParty.util';
import { EventsViewEntity } from '@/types/event.type';
import TitleSection from './sections/title-section/TitleSection';
import TicketSection from './sections/ticket-section/TicketSection';
import ReservationTransferSection from './sections/reservation-transfer-section/ReservationTransferSection';
import { ReservationTransferRequestsEntity } from '@/types/reservationTransferRequest.type';
import InvitePaybackEventSectionClosed from './sections/invite-payback-event-section/InvitePaybackEventSectionClosed';
// import InvitePaybackEventSection from './sections/invite-payback-event-section/InvitePaybackEventSection';
import { useGetUserReferrals } from '@/services/user.service';
import { useMemo } from 'react';
import { ReferralsViewEntity } from '@/types/referral.type';
import LincOpenChatSection from './sections/linc-open-chat-section/LincOpenChatSection';

const CxM_EVENT_ID = '653100251283986798';

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

  const { data: referrals } = useGetUserReferrals();
  const targetReferral = useMemo(
    () =>
      referrals?.find((referral: ReferralsViewEntity) =>
        referral.conditions.some(
          (condition) => condition.reservationId === reservation.reservationId,
        ),
      ) ?? null,
    [referrals, reservation.reservationId],
  );

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
      {/* {!isReservationCanceled && (
        // <InvitePaybackEventSection
        //   referral={targetReferral}
        //   event={event}
        //   reservation={reservation}
        //   payment={payment}
        //   passengerCount={reservation.passengerCount}
        // />
      )} */}
      {!isReservationCanceled &&
        targetReferral &&
        targetReferral.usageCount > 0 && (
          <InvitePaybackEventSectionClosed
            referral={targetReferral}
            event={event}
            reservation={reservation}
            payment={payment}
            passengerCount={reservation.passengerCount}
          />
        )}
      {!isReservationCanceled &&
        !isShuttleRouteEnded &&
        event.eventId === CxM_EVENT_ID && <LincOpenChatSection />}
      <TicketSection
        reservation={reservation}
        isHandyParty={isHandyParty}
        isShuttleRouteEnded={isShuttleRouteEnded}
        isReservationCanceled={isReservationCanceled}
      />
      <ShuttleInfoSection
        eventId={event.eventId}
        reservation={reservation}
        shuttleRoute={shuttleRoute}
        toDestinationHub={toDestinationHub}
        fromDestinationHub={fromDestinationHub}
        isHandyParty={isHandyParty}
        isShuttleRouteEnded={isShuttleRouteEnded}
        isReservationCanceled={isReservationCanceled}
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
        isReservationCanceled={isReservationCanceled}
        isShuttleRouteEnded={isShuttleRouteEnded}
      />
      <GuidelineSection />
      <div className="m-16 text-center text-14 font-600 text-basic-grey-500">
        현재 토스페이먼츠 오류로 인해 자동 환불이 불가능합니다.
        <br />
        CS 채널을 통해 문의 주시면 감사하겠습니다.
      </div>
      {/* <RefundSection
        isTransferredReservation={isTransferredReservation}
        isCanceled={isReservationCanceled}
        isEnded={isShuttleRouteEnded}
        reservation={reservation}
        reservationTransferRequests={reservationTransferRequests}
      /> */}
    </main>
  );
};

export default Content;
