'use client';
import { useRef, useState } from 'react';
import Shuttle from './Shuttle';
import { ShuttleRoute } from '@/types/shuttle.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import dynamic from 'next/dynamic';
const Empty = dynamic(() => import('@/app/shuttle/components/Empty'));

const ShuttlesSwiperView = ({ shuttles }: { shuttles: ShuttleRoute[] }) => {
  const [loading, setLoading] = useState(true);
  const swiper = useRef<SwiperRef>(null);

  if (shuttles.length === 0) {
    return <Empty />;
  }

  return (
    // NOTE slidesOffsetBefore not works with SSR
    <>
      <div className={'relative py-16 ' + (loading ? 'pl-16' : '')}>
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
          {shuttles?.slice(0, 16).map((v) => (
            <SwiperSlide
              key={v.shuttleRouteId}
              style={{ width: 'fit-content' }}
            >
              <div className="pr-[6px]">
                <Shuttle shuttle={v} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ShuttlesSwiperView;
