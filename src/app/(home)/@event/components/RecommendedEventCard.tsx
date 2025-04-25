'use client';

import EventsSwiperView from './EventsSwiperView';
import Article from '@/components/article/Article';
import Chip from '@/components/chips/Chip';
import dayjs from 'dayjs';
import { useState } from 'react';
import { MOCK_EVENT_DATA } from '../mockData.const';

const RecommendedEventCard = () => {
  const isLoading = false;
  const hasConcertAndFestival = true;
  const [type, setType] = useState<'CONCERT' | 'FESTIVAL'>('CONCERT');

  return (
    <section>
      <Article
        richTitle={`${dayjs().format('M')}월 추천 행사`}
        titleClassName="text-20 leading-[140%]"
        showMore={'/event'}
      >
        <div className="flex gap-8">
          {hasConcertAndFestival && (
            <>
              <Chip
                onClick={() => setType('CONCERT')}
                isSelected={type === 'CONCERT'}
              >
                콘서트
              </Chip>
              <Chip
                onClick={() => setType('FESTIVAL')}
                isSelected={type === 'FESTIVAL'}
              >
                페스티벌
              </Chip>
            </>
          )}
        </div>
        {isLoading ? (
          <div className="h-324" />
        ) : (
          <div className="">
            <EventsSwiperView events={MOCK_EVENT_DATA} type="RECOMMEND" />
          </div>
        )}
      </Article>
    </section>
  );
};

export default RecommendedEventCard;
