'use client';

import { PaymentsViewEntity } from '@/types/payment.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import EventCard from './EventCard';
import useReservationProgress, {
  ReservationProgress,
} from '../../../hooks/useReservationProgress';
import ShuttleInfoSection from './sections/shuttle-info-section/ShuttleInfoSection';
import ReservationPersonInfoSection from './sections/ReservationPersonInfoSection';
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
import { useRouter } from 'next/navigation';
import {
  DailyEventsInEventsViewEntity,
  EventsViewEntity,
} from '@/types/event.type';
import dayjs from 'dayjs';

interface Props {
  reservation: ReservationsViewEntity;
  payment: PaymentsViewEntity;
  event: EventsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity;
}

const Content = ({ reservation, payment, event, dailyEvent }: Props) => {
  const router = useRouter();

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

  const { reservationProgress } = useReservationProgress({
    reservation,
    dailyEventDate: dayjs(dailyEvent.date),
  });
  const isCanceled = reservationProgress === 'reservationCanceled';
  const isEnded = reservationProgress === 'shuttleEnded';

  const isHandyParty = checkIsHandyParty(shuttleRoute);

  const openBoardingPassLink = () => {
    router.push(`/mypage/boarding-pass/${reservation.reservationId}`);
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
      <FinalNoticeInfoSection />
      <ul className="flex flex-col gap-24">
        {isHandyParty && (
          <WrapperWithDivider>
            <HandyPartyProgressSection />
          </WrapperWithDivider>
        )}
        {!isCanceled && !isHandyParty && (
          <WrapperWithDivider>
            <section className="flex flex-col gap-16 px-16">
              <Button
                onClick={handleClickAndStopPropagation(openBoardingPassLink)}
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
            name={reservation.userName || reservation.userNickname} // 실명제 도입전 예약한 유저가 실명을 추가하지 않았을 경우 닉네임이 보여짐.
            phoneNumber={reservation.userPhoneNumber}
          />
        </WrapperWithDivider>
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

const FinalNoticeInfoSection = () => {
  return (
    <section className="mb-24 px-16">
      <div className="rounded-8 bg-basic-grey-50 py-8 text-center text-14 font-500 leading-[160%]">
        최종 탑승 정보는 탑승{' '}
        <span className="text-brand-primary-400">1일 전</span> 알려드려요.
      </div>
    </section>
  );
};
