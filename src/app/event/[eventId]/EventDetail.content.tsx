'use client';

import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventGuidelines from './components/EventGuidelines';
import { useGetEvent } from '@/services/event.service';
import EventContent from './components/event-content/EventContent';
import EventOverview from './components/EventOverview';
import EventModal from './components/EventModal';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import { checkIsReservationClosingSoon } from '../utils/checkIsReservationClosingSoon.util';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Header from '@/components/header/Header';

interface Props {
  eventId: string;
}

const EventDetail = ({ eventId }: Props) => {
  const { data: event, isLoading } = useGetEvent(eventId);

  const isClosingSoon = event
    ? checkIsReservationClosingSoon({ event })
    : false;

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event && (
          <>
            <main>
              <EventImage
                eventImageUrl={event.eventImageUrl}
                eventName={event.eventName}
              />
              <EventInfo
                event={event}
                isReservationClosingSoon={isClosingSoon}
              />
              <EventContent event={event} />
              <EventOverview
                event={event}
                eventDetailImageUrl={event.eventDetailImageUrl}
              />
              <EventGuidelines />
              <EventModal eventId={eventId} />
              <div className="h-100 bg-basic-grey-50" />
            </main>
            <KakaoMapScript libraries={['services']} />
          </>
        )}
      </DeferredSuspense>
    </>
  );
};

export default EventDetail;
