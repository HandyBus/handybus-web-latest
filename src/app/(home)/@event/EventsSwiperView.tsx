'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import dynamic from 'next/dynamic';
import Card from '@/components/card/Card';

const Empty = dynamic(() => import('@/app/reservation/components/Empty'));

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[];
  type: 'TREND' | 'RECOMMAND';
}

const EventsSwiperView = ({ events, type }: Props) => {
  const [loading, setLoading] = useState(true);
  const swiper = useRef<SwiperRef>(null);

  if (events.length === 0) {
    return <Empty />;
  }

  return (
    // NOTE slidesOffsetBefore not works with SSR
    <>
      <div className={'relative py-16' + (loading ? 'pl-16' : '')}>
        <Swiper
          ref={swiper}
          pagination={true}
          slidesPerView="auto"
          navigation={true}
          className="relative w-full"
          slidesOffsetBefore={16}
          slidesOffsetAfter={10}
          onAfterInit={() => setLoading(false)}
        >
          {events?.map((v) => (
            <SwiperSlide
              key={v.shuttleRouteId}
              style={{ width: 'fit-content' }}
            >
              <div className="pr-[6px]">
                <Card
                  variant={type === 'TREND' ? 'LARGE' : 'MEDIUM'}
                  image="/images/default-event.png"
                  title={v.title}
                  date={v.date}
                  location={v.location}
                  price={v.price}
                  isSaleStarted={v.isSaleStarted}
                  order={v.order}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default EventsSwiperView;
