'use client';

import Chip from '@/components/chips/Chip';
import { useMemo, useState } from 'react';
import { EventType, EventTypeEnum, EventsViewEntity } from '@/types/event.type';
import { EVENT_TYPE_TO_STRING } from '@/constants/status';
import RecommendedEventSwiperView from './RecommendedEventSwiperView';
import CardSection from './CardSection';
import Empty from '@/app/event/components/Empty';

type EventTypeWithAll = EventType | 'ALL';

interface Props {
  events: EventsViewEntity[] | null | undefined;
}

const PinnedEventCard = ({ events }: Props) => {
  const [type, setType] = useState<EventTypeWithAll>('ALL');

  // 각 이벤트 타입별로 이벤트가 있는지 확인
  const availableEventTypes = EventTypeEnum.options.filter((eventType) =>
    events?.some((event) => event.eventType === eventType),
  );

  const filteredEvents = useMemo(() => {
    if (type === 'ALL') {
      return events;
    }
    return events?.filter((event) => event.eventType === type);
  }, [events, type]);

  return (
    <section>
      <CardSection richTitle={`이달의 추천 행사`} showMore="/event-from-home">
        {availableEventTypes.length > 1 && (
          <div className="flex gap-8 pb-16">
            <Chip
              key={'ALL'}
              onClick={() => setType('ALL')}
              isSelected={type === 'ALL'}
            >
              전체
            </Chip>
            {availableEventTypes.map((eventType) => (
              <Chip
                key={eventType}
                onClick={() => setType(eventType)}
                isSelected={type === eventType}
              >
                {EVENT_TYPE_TO_STRING[eventType]}
              </Chip>
            ))}
          </div>
        )}
        {!filteredEvents ? (
          <Empty />
        ) : (
          <RecommendedEventSwiperView events={filteredEvents} />
        )}
      </CardSection>
    </section>
  );
};

export default PinnedEventCard;
