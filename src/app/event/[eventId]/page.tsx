import Header from '@/components/header/Header';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventGuidelines from './components/EventGuidelines';
import { getEvent } from '@/services/event.service';
import EventContent from './components/EventContent';
import EventOverview from './components/EventOverview';
import EventModal from './components/EventModal';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import dayjs from 'dayjs';

const NO_DEMAND_REWARD_COUPON_EVENT_IDS = ['612882322705879531'];

interface Props {
  params: {
    eventId: string;
  };
}

const Page = async ({ params }: Props) => {
  const event = await getEvent(params.eventId);

  const isNoDemandRewardCouponEvent =
    NO_DEMAND_REWARD_COUPON_EVENT_IDS.includes(event.eventId);

  // 행사 첫날을 기준으로 8일 전부터 마감임박 표시 (5일전 예약마감 이므로 3일간 표시)
  const isBookingClosingSoon =
    event.eventStatus === 'OPEN' &&
    event.eventHasOpenRoute &&
    dayjs(event.startDate).subtract(8, 'day').isBefore(dayjs());

  return (
    <>
      <Header />
      <main>
        <EventImage
          eventImageUrl={event.eventImageUrl}
          eventName={event.eventName}
        />
        <EventInfo event={event} isBookingClosingSoon={isBookingClosingSoon} />
        <EventContent
          event={event}
          isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
          hasOpenRoute={event.eventHasOpenRoute}
        />
        <EventOverview
          event={event}
          eventId={params.eventId}
          eventDetailImageUrl={event.eventDetailImageUrl}
          isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
        />
        <EventGuidelines />
        <EventModal eventId={params.eventId} />
        <div className="h-100 bg-basic-grey-50" />
      </main>
      <KakaoMapScript libraries={['services']} />
    </>
  );
};

export default Page;
