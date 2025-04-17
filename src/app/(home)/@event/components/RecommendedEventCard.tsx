'use client';

import EventsSwiperView from './EventsSwiperView';
import Article from '@/components/article/Article';
import Chip from '@/components/chips/Chip';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetEvents } from '@/services/event.service';

const RecommendedEventCard = () => {
  const [type, setType] = useState<'CONCERT' | 'FESTIVAL'>('CONCERT');
  const { data: recommendedEvents, isLoading } = useGetEvents({
    status: 'OPEN',
    eventIsPinned: true,
  });

  const filteredEvents = recommendedEvents?.filter(
    (event) => event.eventType === type,
  );

  return (
    <section>
      <Article
        richTitle={`${dayjs().format('M')}월 추천 행사`}
        titleClassName="text-20 leading-[140%]"
        showMore="/event"
      >
        <div className="flex gap-8">
          {EVENT_TYPES.map(({ key, label }) => (
            <Chip
              key={key}
              onClick={() => setType(key as 'CONCERT' | 'FESTIVAL')}
              isSelected={type === key}
            >
              {label}
            </Chip>
          ))}
        </div>
        {isLoading || !filteredEvents ? (
          EMPTY_VIEW
        ) : (
          <div>
            <EventsSwiperView events={filteredEvents} type="RECOMMEND" />
          </div>
        )}
      </Article>
    </section>
  );
};

export default RecommendedEventCard;

const EVENT_TYPES = [
  { key: 'CONCERT', label: '콘서트' },
  { key: 'FESTIVAL', label: '페스티벌' },
];

const EMPTY_VIEW = <div className="h-[324px]" />;
