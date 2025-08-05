'use client';

import { PaymentsViewEntity } from '@/types/payment.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import EventCard from './EventCard';
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
import HandyPartyProgressSection from './sections/shuttle-progress-section/HandyPartyProgressSection';
import Button from '@/components/buttons/button/Button';

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

  const noticeRoomUrl = dailyEvent?.metadata?.openChatUrl;
  const handleOpenNoticeRoom = () => {
    if (noticeRoomUrl) {
      window.open(noticeRoomUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
        {!isCanceled &&
          (isHandyParty ? (
            <WrapperWithDivider>
              <HandyPartyProgressSection
                reservationProgress={reservationProgress}
                isOpenChatLinkCreated={isOpenChatLinkCreated}
                handyStatus={handyStatus}
                shuttleBus={shuttleBus}
                isHandyParty={isHandyParty}
              />
            </WrapperWithDivider>
          ) : (
            <>
              <WrapperWithDivider>
                <section className="flex flex-col gap-16 px-16">
                  <Button>탑승권 확인하기</Button>
                  <p className="text-14 font-500 leading-[160%]">
                    현장에서 탑승권을 제시한 후 탑승해 주세요.{' '}
                    <span className="font-600 text-basic-red-400">
                      캡쳐 이미지로는 탑승이 제한될 수 있는 점 참고해 주세요.
                    </span>
                  </p>
                </section>
              </WrapperWithDivider>
              <WrapperWithDivider>
                {/* NOTE: 일자별 노선에 오픈채팅방이 먼저 반영되고 출시되어야 하는 기능 */}
                <section className="flex flex-col gap-16 px-16">
                  <Button
                    variant="secondary"
                    onClick={handleOpenNoticeRoom}
                    disabled={!noticeRoomUrl}
                  >
                    공지방 참여하기
                  </Button>
                  <p className="text-14 font-500 leading-[160%]">
                    탑승 당일, 셔틀버스 변동사항 및 실시간 안내사항은 공지방에서
                    이루어져요. 탑승 전 반드시 참여해 주세요!
                  </p>
                </section>
              </WrapperWithDivider>
            </>
          ))}
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
            name={reservation.userName}
            phoneNumber={reservation.userPhoneNumber}
          />
        </WrapperWithDivider>
        {!isHandyParty && (
          <WrapperWithDivider>
            <HandySection handyStatus={handyStatus} />
          </WrapperWithDivider>
        )}
        <WrapperWithDivider>
          <PriceSection
            payment={payment}
            passengerCount={reservation.passengerCount}
            isCanceled={isCanceled}
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
