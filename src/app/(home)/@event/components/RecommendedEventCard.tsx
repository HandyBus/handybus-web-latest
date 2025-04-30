'use client';

import EventsSwiperView from './EventsSwiperView';
import Article from '@/components/article/Article';
import Chip from '@/components/chips/Chip';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetEvents } from '@/services/event.service';
import { EventType, EventTypeEnum } from '@/types/event.type';
import { EVENT_TYPE_TO_STRING } from '@/constants/status';

const RecommendedEventCard = () => {
  const [type, setType] = useState<EventType>('CONCERT');
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
          {EventTypeEnum.options.map((eventType) => (
            <Chip
              key={eventType}
              onClick={() => setType(eventType)}
              isSelected={type === eventType}
            >
              {EVENT_TYPE_TO_STRING[eventType]}
            </Chip>
          ))}
        </div>
        {isLoading || !filteredEvents ? (
          <EmptyView />
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

const EmptyView = () => <div className="h-[324px]" />;
