'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import Card from '@/components/card/Card';
import ViewAllButton from '@/components/buttons/view-all-button/ViewAllButton';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[];
  type: 'TREND' | 'RECOMMAND';
}

const EventsSwiperView = ({ events, type }: Props) => {
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
          {type === 'RECOMMAND' && (
            <SwiperSlide style={{ width: 'fit-content' }}>
              <div className="flex h-[193px] w-92 flex-col items-center justify-center gap-[18px] pr-[6px]">
                <ViewAllButton onClick={() => {}} />
                <p className="text-14 font-600 leading-[160%] text-basic-grey-600">
                  전체보기
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default EventsSwiperView;
