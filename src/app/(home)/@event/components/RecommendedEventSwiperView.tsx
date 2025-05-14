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
}

const RecommendedEventSwiperView = ({ events }: Props) => {
  const swiper = useRef<SwiperRef>(null);

  return (
    <>
      <div className={'relative py-16'}>
        <Swiper
          ref={swiper}
          pagination={true}
          slidesPerView="auto"
          navigation={true}
          className="relative w-full"
        >
          {events?.map((v, idx) => (
            <SwiperSlide key={v.eventId} style={{ width: 'auto' }}>
              <div className="pr-[6px]">
                <Card
                  variant={'MEDIUM'}
                  image={v.eventImageUrl}
                  title={v.eventName}
                  date={v.startDate}
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
    </>
  );
};

export default RecommendedEventSwiperView;
