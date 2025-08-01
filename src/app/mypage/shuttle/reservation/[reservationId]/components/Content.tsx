'use client';

import { PaymentsViewEntity } from '@/types/payment.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import EventCard from './EventCard';
import ShuttleProgressSection from './sections/shuttle-progress-section/ShuttleProgressSection';
import useReservationProgress, {
  ReservationProgress,
} from '../../../hooks/useReservationProgress';
import ShuttleInfoSection from './sections/shuttle-info-section/ShuttleInfoSection';
import ReservationPersonInfoSection from './sections/ReservationPersonInfoSection';
import HandySection from './sections/handy-section/HandySection';
import PriceSection from './sections/price-section/PriceSection';
import GuidelineSection from './sections/GuidelineSection';
import RefundSection from './sections/refund-section/RefundSection';
import PrimaryCheckIcon from '../icons/icon-check-primary.svg';
import GreyCheckIcon from '../icons/icon-check-grey.svg';
import WrapperWithDivider from './WrapperWithDivider';
import { checkIsHandyParty } from '@/utils/handyParty.util';

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
  const isCanceled = reservationProgress === 'reservationCanceled';
  const isEnded = reservationProgress === 'shuttleEnded';

  const isHandyParty = checkIsHandyParty(shuttleRoute);

  return (
    <main className="grow pb-16">
      {isHandyParty && (
        <div className="bg-basic-blue-100 py-8 text-center text-12 font-500 leading-[160%] text-basic-blue-400">
          예약하신 셔틀은 <span className="font-700">핸디팟</span>입니다. 탑승
          시 확인해주세요.
        </div>
      )}
      <Title progress={reservationProgress} />
      <EventCard event={event} />
      <ul className="flex flex-col gap-24">
        {!isCanceled && (
          <WrapperWithDivider>
            <ShuttleProgressSection
              reservation={reservation}
              reservationProgress={reservationProgress}
              isOpenChatLinkCreated={isOpenChatLinkCreated}
              handyStatus={handyStatus}
              shuttleBus={shuttleBus}
              isHandyParty={isHandyParty}
            />
          </WrapperWithDivider>
        )}
        <WrapperWithDivider>
          <ShuttleInfoSection
            tripType={reservation.type}
            toDestinationHub={toDestinationHub}
            fromDestinationHub={fromDestinationHub}
            shuttleRoute={shuttleRoute}
            passengerCount={reservation.passengerCount}
            isHandyParty={isHandyParty}
            desiredHubAddress={
              reservation.metadata?.desiredHubAddress ?? undefined
            }
            desiredHubLatitude={
              reservation.metadata?.desiredHubLatitude ?? undefined
            }
            desiredHubLongitude={
              reservation.metadata?.desiredHubLongitude ?? undefined
            }
          />
        </WrapperWithDivider>
        <WrapperWithDivider>
          <ReservationPersonInfoSection
            nickname={reservation.userNickname}
            phoneNumber={reservation.userPhoneNumber}
          />
        </WrapperWithDivider>
        {!isHandyParty && (
          <WrapperWithDivider>
            <HandySection
              isCanceled={isCanceled}
              isEnded={isEnded}
              handyStatus={handyStatus}
              reservationId={reservation.reservationId}
            />
          </WrapperWithDivider>
        )}
        <WrapperWithDivider>
          <PriceSection
            payment={payment}
            passengerCount={reservation.passengerCount}
            isCanceled={isCanceled}
            isHandySupported={handyStatus !== 'NOT_SUPPORTED'}
          />
        </WrapperWithDivider>
        <GuidelineSection />
        <RefundSection
          isCanceled={isCanceled}
          isEnded={isEnded}
          reservation={reservation}
        />
      </ul>
    </main>
  );
};

export default Content;

interface TitleProps {
  progress: ReservationProgress;
}

const Title = ({ progress }: TitleProps) => {
  if (progress === 'reservationCanceled') {
    return (
      <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-22 font-700 text-basic-red-400">
        예약 취소
      </h1>
    );
  }
  if (progress === 'shuttleEnded') {
    return (
      <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-22 font-700">
        <GreyCheckIcon />
        <span>셔틀 종료</span>
      </h1>
    );
  }
  return (
    <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-22 font-700">
      <PrimaryCheckIcon />
      <span>예약 완료</span>
    </h1>
  );
};
