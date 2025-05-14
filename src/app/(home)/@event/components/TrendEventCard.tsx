'use client';

import { useGetEvents } from '@/services/event.service';
import CardSection from './CardSection';
import TrendEventsSwiperView from './TrendEventsSwiperView';

const TrendEventCard = () => {
  const { data: popularEvents } = useGetEvents({
    status: 'OPEN',
    orderBy: 'eventRecommendationScore',
    additionalOrderOptions: 'DESC',
  });

  const slicedEvents = !popularEvents
    ? []
    : popularEvents.length > 20
      ? popularEvents.slice(0, MAX_EVENTS_COUNT)
      : popularEvents.slice(0, MIN_EVENTS_COUNT);

  return (
    <section>
      <CardSection
        richTitle="실시간 인기 셔틀"
        titleClassName="text-20 leading-[140%] py-0"
      >
        {popularEvents ? (
          <TrendEventsSwiperView events={slicedEvents} type="TREND" />
        ) : (
          <EmptyView />
        )}
      </CardSection>
    </section>
  );
};

export default TrendEventCard;

const EmptyView = () => <div className="h-[340px] py-16" />;
const MAX_EVENTS_COUNT = 5;
const MIN_EVENTS_COUNT = 3;
