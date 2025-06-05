'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import Card from '@/components/card/Card';
import ViewAllButton from '@/app/(home)/@event/components/ViewAllButton';
import Link from 'next/link';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';

interface Props {
  events: EventWithRoutesViewEntity[];
}

const RecommendedEventSwiperView = ({ events }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={'relative -mx-16 h-304 w-[calc(100%+32px)]'}>
      <div
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Swiper
          ref={swiper}
          pagination={true}
          slidesPerView="auto"
          navigation={true}
          className="relative w-full"
          onInit={() => setIsLoaded(true)}
        >
          <SwiperSlide style={{ width: 'auto' }}>
            <div className="w-16" />
          </SwiperSlide>
          {events?.map((v, idx) => (
            <SwiperSlide key={v.eventId} style={{ width: 'auto' }}>
              <div className="pr-[6px]">
                <Card
                  variant={'MEDIUM'}
                  image={v.eventImageUrl}
                  title={v.eventName}
                  date={dateString([v.startDate, v.endDate], {
                    showWeekday: false,
                  })}
                  location={v.eventLocationName}
                  price={`${v.minRoutePrice?.toLocaleString()}원 ~`}
                  isSaleStarted={v.hasOpenRoute}
                  order={idx + 1}
                  href={`/event/${v.eventId}`}
                />
              </div>
            </SwiperSlide>
          ))}
          {
            <SwiperSlide style={{ width: 'auto' }}>
              <Link
                href="/event"
                className="group flex h-[300px] w-92 cursor-pointer flex-col items-center gap-[8px] pr-[6px]
    pt-72
    transition-colors"
              >
                <ViewAllButton />
                <p className="text-14 font-600 leading-[160%] text-basic-grey-600">
                  전체보기
                </p>
              </Link>
            </SwiperSlide>
          }
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedEventSwiperView;
