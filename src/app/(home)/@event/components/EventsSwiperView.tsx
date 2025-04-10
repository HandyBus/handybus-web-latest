'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import Card from '@/components/card/Card';
import ViewAllButton from '@/app/(home)/@event/components/ViewAllButton';
import { useRouter } from 'next/navigation';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[];
  type: 'TREND' | 'RECOMMEND';
}

const EventsSwiperView = ({ events, type }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const { push } = useRouter();
  const [isViewAllActive, setIsViewAllActive] = useState(false);

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
          {type === 'RECOMMEND' && (
            <SwiperSlide style={{ width: 'fit-content' }}>
              <button
                onClick={() => push('/event')}
                className="flex h-[300px] w-92 flex-col items-center gap-[8px] pr-[6px] pt-72"
                onMouseDown={() => setIsViewAllActive(true)}
                onMouseLeave={() => setIsViewAllActive(false)}
              >
                <ViewAllButton isActive={isViewAllActive} />
                <p className="text-14 font-600 leading-[160%] text-basic-grey-600">
                  전체보기
                </p>
              </button>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default EventsSwiperView;
