'use client';

import EventsSwiperView from './EventsSwiperView';
import Article from '@/components/article/Article';
import Chip from '@/components/chips/Chip';
import dayjs from 'dayjs';
import { useState } from 'react';
import { mock_event_data } from '../mockData.const';

const RecommendedEventCard = () => {
  const isLoading = false;
  const [type, setType] = useState<'콘서트' | '지역축제' | '페스티벌'>(
    '콘서트',
  );

  return (
    <section>
      <Article
        richTitle={`${dayjs().format('M')}월 추천 행사`}
        titleClassName="text-20 leading-[140%]"
        showMore={'/event'}
      >
        {' '}
        <div className="flex gap-8">
          <Chip
            onClick={() => setType('콘서트')}
            isSelected={type === '콘서트'}
          >
            콘서트
          </Chip>
          <Chip
            onClick={() => setType('지역축제')}
            isSelected={type === '지역축제'}
          >
            지역축제
          </Chip>
          <Chip
            onClick={() => setType('페스티벌')}
            isSelected={type === '페스티벌'}
          >
            페스티벌
          </Chip>
        </div>
        {isLoading ? (
          <div className="h-324" />
        ) : (
          <div className="">
            <EventsSwiperView events={mock_event_data} type="RECOMMEND" />
          </div>
        )}
      </Article>
    </section>
  );
};

export default RecommendedEventCard;
