'use client';

import Article from '@/components/article/Article';
import EventsSwiperView from './EventsSwiperView';
import { useGetEvents } from '@/services/event.service';

const TrendShuttleCard = () => {
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
      <Article
        richTitle="실시간 인기 셔틀"
        titleClassName="text-20 leading-[140%]"
      >
        {popularEvents ? (
          <EventsSwiperView events={slicedEvents} type="TREND" />
        ) : (
          <EmptyView />
        )}
      </Article>
    </section>
  );
};

export default TrendShuttleCard;

const EmptyView = () => <div className="h-[340px] py-16" />;
const MAX_EVENTS_COUNT = 5;
const MIN_EVENTS_COUNT = 3;
