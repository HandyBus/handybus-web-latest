'use client';

import Chip from '@/components/chips/Chip';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useGetEvents } from '@/services/event.service';
import { EventType, EventTypeEnum } from '@/types/event.type';
import { EVENT_TYPE_TO_STRING } from '@/constants/status';
import RecommendedEventSwiperView from './RecommendedEventSwiperView';
import CardSection from './CardSection';
import Empty from '@/app/event/components/Empty';

const RecommendedEventCard = () => {
  const [type, setType] = useState<EventType>('CONCERT');
  const { data: recommendedEvents, isLoading } = useGetEvents({
    status: 'OPEN,CLOSED',
    eventIsPinned: true,
  });

  // 각 이벤트 타입별로 이벤트가 있는지 확인
  const availableEventTypes = EventTypeEnum.options.filter((eventType) =>
    recommendedEvents?.some((event) => event.eventType === eventType),
  );

  // 데이터가 로드되고 현재 선택된 타입의 이벤트가 없으면 첫 번째 사용 가능한 타입으로 변경
  useEffect(() => {
    if (
      !isLoading &&
      availableEventTypes.length > 0 &&
      !availableEventTypes.includes(type)
    ) {
      setType(availableEventTypes[0]);
    }
  }, [availableEventTypes, isLoading, type]);

  const filteredEvents = recommendedEvents?.filter(
    (event) => event.eventType === type,
  );

  return (
    <section>
      <CardSection
        richTitle={`${dayjs().format('M')}월 추천 행사`}
        showMore="/event"
      >
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
        {isLoading ? (
          <LoadingView />
        ) : !filteredEvents ? (
          <Empty />
        ) : (
          <RecommendedEventSwiperView events={filteredEvents} />
        )}
      </CardSection>
    </section>
  );
};

export default RecommendedEventCard;

const LoadingView = () => <div className="h-[337px]" />;
