'use client';
import { useRef, useState } from 'react';
import Route from './Route';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import dynamic from 'next/dynamic';
import { ShuttleRoutesViewEntity } from '@/types/shuttle-operation.type';
const Empty = dynamic(() => import('@/app/reservation/components/Empty'));

interface Props {
  routes: ShuttleRoutesViewEntity[];
}

const RoutesSwiperView = ({ routes }: Props) => {
  const [loading, setLoading] = useState(true);
  const swiper = useRef<SwiperRef>(null);

  if (routes.length === 0) {
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
          {routes?.map((v) => (
            <SwiperSlide
              key={v.shuttleRouteId}
              style={{ width: 'fit-content' }}
            >
              <div className="pr-[6px]">
                <Route route={v} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default RoutesSwiperView;
