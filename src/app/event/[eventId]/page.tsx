import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventGuidelines from './components/EventGuidelines';
import { getEvent } from '@/services/event.service';
import EventContent from './components/event-content/EventContent';
import EventOverview from './components/EventOverview';
import EventModal from './components/EventModal';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import { checkIsReservationClosingSoon } from '../utils/checkIsReservationClosingSoon.util';
import EventProvider from './components/EventProvider';
// import ReferralDiscountNotice from './components/ReferralDiscountNotice';

// const SEARCH_PARAMS_KEYS = {
//   referralCode: 'referral-code',
// } as const;

interface Props {
  params: {
    eventId: string;
  };
  // searchParams: {
  //   [SEARCH_PARAMS_KEYS.referralCode]?: string;
  // };
}

const Page = async ({
  params,
  // searchParams
}: Props) => {
  const event = await getEvent(params.eventId);

  const isClosingSoon = checkIsReservationClosingSoon({ event });

  // const hasReferralCode = Boolean(
  //   searchParams[SEARCH_PARAMS_KEYS.referralCode],
  // );

  return (
    <>
      <EventProvider event={event}>
        <main>
          {/* {hasReferralCode && <ReferralDiscountNotice />} */}
          <EventImage
            eventImageUrl={event.eventImageUrl}
            eventName={event.eventName}
          />
          <EventInfo event={event} isReservationClosingSoon={isClosingSoon} />
          <EventContent event={event} />
          <EventOverview
            event={event}
            eventDetailImageUrl={event.eventDetailImageUrl}
          />
          <EventGuidelines />
          <EventModal eventId={params.eventId} />
          <div className="h-100 bg-basic-grey-50" />
        </main>
      </EventProvider>
      <KakaoMapScript libraries={['services']} />
    </>
  );
};

export default Page;
