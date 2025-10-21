import Header from '@/components/header/Header';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventGuidelines from './components/EventGuidelines';
import { getEvent } from '@/services/event.service';
import EventContent from './components/event-content/EventContent';
import EventOverview from './components/EventOverview';
import EventModal from './components/EventModal';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import { checkIsReservationClosingSoon } from '../utils/checkIsReservationClosingSoon.util';

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

  const isClosingSoon = checkIsReservationClosingSoon({ event });

  return (
    <>
      <Header />
      <main>
        <EventImage
          eventImageUrl={event.eventImageUrl}
          eventName={event.eventName}
        />
        <EventInfo event={event} isReservationClosingSoon={isClosingSoon} />
        <EventContent
          event={event}
          isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
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
