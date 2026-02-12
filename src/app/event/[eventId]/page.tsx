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
import EventCampaign from './components/cheer/EventCampaign';
import ReferralDiscountNotice from './components/ReferralDiscountNotice';
import { generateEventJsonLd } from './utils/generateEventJsonLd.util';

const SEARCH_PARAMS_KEYS = {
  referralCode: 'referral-code',
} as const;

interface Props {
  params: {
    eventId: string;
  };
  searchParams: {
    [SEARCH_PARAMS_KEYS.referralCode]?: string;
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const event = await getEvent(params.eventId);

  const isClosingSoon = checkIsReservationClosingSoon({ event });

  const hasReferralCode = Boolean(
    searchParams[SEARCH_PARAMS_KEYS.referralCode],
  );

  // JSON-LD 구조화 데이터 생성 (Google Rich Results용)
  const jsonLd = generateEventJsonLd(event);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventProvider event={event}>
        <main>
          {hasReferralCode && <ReferralDiscountNotice />}
          <EventImage
            eventImageUrl={event.eventImageUrl}
            eventName={event.eventName}
          />
          <EventInfo event={event} isReservationClosingSoon={isClosingSoon} />
          <EventCampaign />
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
