'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import Card from '@/components/card/Card';
import ViewAllButton from '@/app/(home)/@event/components/ViewAllButton';
import Link from 'next/link';
import { EventWithRoutesViewEntity } from '@/types/event.type';

interface Props {
  events: EventWithRoutesViewEntity[];
  type: 'TREND' | 'RECOMMEND';
}

const EventsSwiperView = ({ events, type }: Props) => {
  const swiper = useRef<SwiperRef>(null);

  const cardCount = events.length;
  const extendedEvents = cardCount < 5 ? extendArrayToFive(events) : events;

  return (
    <>
      <div className={'relative -mx-16 w-[calc(100%+32px)] py-16'}>
        <Swiper
          ref={swiper}
          pagination={true}
          slidesPerView="auto"
          navigation={true}
          loop={true}
          centeredSlides={true}
          className="relative w-full"
        >
          {extendedEvents?.map((v, idx) => (
            <SwiperSlide key={v.eventId + idx} style={{ width: 'auto' }}>
              <div className="pr-[6px]">
                <Card
                  variant={type === 'TREND' ? 'LARGE' : 'MEDIUM'}
                  image={v.eventImageUrl}
                  title={v.eventName}
                  date={v.startDate}
                  location={v.eventLocationName}
                  price={`${v.minRoutePrice?.toLocaleString()}원 ~`}
                  isSaleStarted={v.hasOpenRoute}
                  order={(idx % cardCount) + 1}
                  href={`/event/${v.eventId}`}
                />
              </div>
            </SwiperSlide>
          ))}
          {type === 'RECOMMEND' && (
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
          )}
        </Swiper>
      </div>
    </>
  );
};

export default EventsSwiperView;

const extendArrayToFive = <T,>(arr: T[]): T[] => {
  if (arr.length === 0) {
    return [];
  }

  const result: T[] = [];
  while (result.length < 5) {
    result.push(...arr);
  }
  return result.slice(0, 5);
};
