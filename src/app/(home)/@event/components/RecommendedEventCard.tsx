'use client';

import Chip from '@/components/chips/Chip';
import { useEffect, useState } from 'react';
import {
  EventType,
  EventTypeEnum,
  EventWithRoutesViewEntity,
} from '@/types/event.type';
import { EVENT_TYPE_TO_STRING } from '@/constants/status';
import RecommendedEventSwiperView from './RecommendedEventSwiperView';
import CardSection from './CardSection';
import Empty from '@/app/event/components/Empty';

interface Props {
  events: EventWithRoutesViewEntity[] | null | undefined;
}

const RecommendedEventCard = ({ events }: Props) => {
  const [type, setType] = useState<EventType>('CONCERT');

  // 각 이벤트 타입별로 이벤트가 있는지 확인
  const availableEventTypes = EventTypeEnum.options.filter((eventType) =>
    events?.some((event) => event.eventType === eventType),
  );

  // 데이터가 로드되고 현재 선택된 타입의 이벤트가 없으면 첫 번째 사용 가능한 타입으로 변경
  useEffect(() => {
    if (availableEventTypes.length > 0 && !availableEventTypes.includes(type)) {
      setType(availableEventTypes[0]);
    }
  }, [availableEventTypes, type]);

  const filteredEvents = events?.filter((event) => event.eventType === type);

  return (
    <section>
      <CardSection richTitle={`이달의 추천 행사`} showMore="/event">
        {availableEventTypes.length > 1 && (
          <div className="flex gap-8 pb-16">
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

export default RecommendedEventCard;
