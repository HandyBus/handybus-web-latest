'use client';

import Article from '@/components/article/Article';
import { MOCK_EVENT_DATA } from '../mockData.const';
import EventsSwiperView from './EventsSwiperView';

const TrendShuttleCard = () => {
  const isLoading = false;

  return (
    <section>
      <Article
        richTitle="실시간 인기 셔틀"
        titleClassName="text-20 leading-[140%]"
      >
        {isLoading ? (
          <div className="h-[340px] py-16" />
        ) : (
          <div className="">
            <EventsSwiperView events={MOCK_EVENT_DATA} type="TREND" />
          </div>
        )}
      </Article>
    </section>
  );
};

export default TrendShuttleCard;
