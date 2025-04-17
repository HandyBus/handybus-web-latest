'use client';

import Article from '@/components/article/Article';
import EventsSwiperView from './EventsSwiperView';
import { useGetEvents } from '@/services/event.service';

const TrendShuttleCard = () => {
  const { data: popularEvents, isLoading } = useGetEvents({
    status: 'OPEN',
    orderBy: 'eventRecommendationScore',
    additionalOrderOptions: 'DESC',
  });

  let content = EMPTY_VIEW;

  if (!isLoading && popularEvents) {
    if (popularEvents.length > 20) {
      content = (
        <EventsSwiperView
          events={popularEvents.slice(0, MAX_EVENTS_COUNT)}
          type="TREND"
        />
      );
    } else if (popularEvents.length > 0) {
      content = (
        <EventsSwiperView
          events={popularEvents.slice(0, MIN_EVENTS_COUNT)}
          type="TREND"
        />
      );
    }
  }

  return (
    <section>
      <Article
        richTitle="실시간 인기 셔틀"
        titleClassName="text-20 leading-[140%]"
      >
        {content}
      </Article>
    </section>
  );
};

export default TrendShuttleCard;

const EMPTY_VIEW = <div className="h-[340px] py-16" />;
const MAX_EVENTS_COUNT = 5;
const MIN_EVENTS_COUNT = 3;
