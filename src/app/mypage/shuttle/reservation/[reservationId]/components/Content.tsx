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
import { handleClickAndStopPropagation } from '@/utils/common.util';
import { useMemo } from 'react';

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

  const { reservationProgress, handyStatus } = useReservationProgress({
    reservation,
    dailyEvent,
  });
  const isCanceled = reservationProgress === 'reservationCanceled';
  const isEnded = reservationProgress === 'shuttleEnded';

  const isHandyParty = checkIsHandyParty(shuttleRoute);

  const isSeventeenEvent =
    reservation.shuttleRoute.eventId === '603038379151464486';
  const temporaryNoticeRoomUrl: string | null = useMemo(() => {
    const SHUTTLE_ROUTE_ID_13_대구 = '613618546496246356';
    const SHUTTLE_ROUTE_ID_13_부산 = '613620913623012086';
    const SHUTTLE_ROUTE_ID_13_대전 = '611769613054644567';
    const SHUTTLE_ROUTE_ID_13_천안아산 = '613615679391666718';
    const SHUTTLE_ROUTE_ID_13_청주 = '611771163789496897';
    const OPEN_CHAT_URL_13_대구 = 'https://open.kakao.com/o/gwew7bQh';
    const OPEN_CHAT_URL_13_부산 = 'https://open.kakao.com/o/gp1J7bQh';
    const OPEN_CHAT_URL_13_대전 = 'https://open.kakao.com/o/gaoW7bQh';
    const OPEN_CHAT_URL_13_천안아산 = 'https://open.kakao.com/o/gOF77bQh';
    const OPEN_CHAT_URL_13_청주 = 'https://open.kakao.com/o/grNn8bQh';
    const SHUTTLE_ROUTE_ID_14_대구 = '613623549873099706';
    const SHUTTLE_ROUTE_ID_14_부산 = '613622643945378707';
    const SHUTTLE_ROUTE_ID_14_대전 = '611770340053357083';
    const SHUTTLE_ROUTE_ID_14_천안아산 = '613624012286727144';
    const SHUTTLE_ROUTE_ID_14_청주 = '611771616103240128';
    const OPEN_CHAT_URL_14_대구 = 'https://open.kakao.com/o/gRTC8bQh';
    const OPEN_CHAT_URL_14_부산 = 'https://open.kakao.com/o/gSJS8bQh';
    const OPEN_CHAT_URL_14_대전 = 'https://open.kakao.com/o/gbVe9bQh';
    const OPEN_CHAT_URL_14_천안아산 = 'https://open.kakao.com/o/gZau9bQh';
    const OPEN_CHAT_URL_14_청주 = 'https://open.kakao.com/o/g1QhacQh';

    switch (reservation.shuttleRouteId) {
      // 세븐틴 9/13 노선목록
      case SHUTTLE_ROUTE_ID_13_대구:
        return OPEN_CHAT_URL_13_대구;
      case SHUTTLE_ROUTE_ID_13_부산:
        return OPEN_CHAT_URL_13_부산;
      case SHUTTLE_ROUTE_ID_13_대전:
        return OPEN_CHAT_URL_13_대전;
      case SHUTTLE_ROUTE_ID_13_천안아산:
        return OPEN_CHAT_URL_13_천안아산;
      case SHUTTLE_ROUTE_ID_13_청주:
        return OPEN_CHAT_URL_13_청주;
      // 세븐틴 9/14 노선목록
      case SHUTTLE_ROUTE_ID_14_대구:
        return OPEN_CHAT_URL_14_대구;
      case SHUTTLE_ROUTE_ID_14_부산:
        return OPEN_CHAT_URL_14_부산;
      case SHUTTLE_ROUTE_ID_14_대전:
        return OPEN_CHAT_URL_14_대전;
      case SHUTTLE_ROUTE_ID_14_천안아산:
        return OPEN_CHAT_URL_14_천안아산;
      case SHUTTLE_ROUTE_ID_14_청주:
        return OPEN_CHAT_URL_14_청주;

      default:
        return null;
    }
  }, [reservation.shuttleRouteId]);

  // NOTE: 일자별 노선의 metadata에 오픈채팅방 링크를 임시로 반영하기로 함. 앱 출시 후 삭제예정
  const noticeRoomUrl = isSeventeenEvent
    ? temporaryNoticeRoomUrl
    : dailyEvent?.metadata?.openChatUrl;
  const handleOpenNoticeRoom = () => {
    if (noticeRoomUrl) {
      window.open(noticeRoomUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const openBoardingPassLink = () => {
    window.open(
      `/mypage/boarding-pass?reservationId=${reservation.reservationId}`,
      '_blank',
    );
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
                shuttleBus={shuttleBus}
              />
            </WrapperWithDivider>
          ) : (
            <>
              <WrapperWithDivider>
                <section className="flex flex-col gap-16 px-16">
                  <Button
                    onClick={handleClickAndStopPropagation(
                      openBoardingPassLink,
                    )}
                    disabled={isEnded || isCanceled}
                  >
                    {isEnded || isCanceled
                      ? '이용이 만료된 탑승권입니다'
                      : '탑승권 확인하기'}
                  </Button>
                  <p className="text-14 font-500 leading-[160%]">
                    현장에서 탑승권을 제시한 후 탑승해 주세요.{' '}
                    <span className="font-600 text-basic-red-400">
                      캡쳐 이미지로는 탑승이 제한될 수 있는 점 참고해 주세요.
                    </span>
                  </p>
                </section>
              </WrapperWithDivider>
              {noticeRoomUrl && (
                <WrapperWithDivider>
                  <section className="flex flex-col gap-16 px-16">
                    <Button
                      variant="secondary"
                      onClick={handleOpenNoticeRoom}
                      disabled={!noticeRoomUrl || isEnded || isCanceled}
                    >
                      공지방 참여하기
                    </Button>
                    <p className="text-14 font-500 leading-[160%]">
                      {isEnded || isCanceled
                        ? '종료된 공지방입니다.'
                        : '탑승 당일, 셔틀버스 변동사항 및 실시간 안내사항은\n공지방에서 이루어져요. 탑승 전 반드시 참여해 주세요!'}
                    </p>
                  </section>
                </WrapperWithDivider>
              )}
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
            name={reservation.userName || reservation.userNickname} // 실명제 도입전 예약한 유저가 실명을 추가하지 않았을 경우 닉네임이 보여짐.
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
