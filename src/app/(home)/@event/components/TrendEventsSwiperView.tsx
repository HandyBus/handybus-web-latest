'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import Card from '@/components/card/Card';
import { EventWithRoutesViewEntity } from '@/types/event.type';

const MIN_CARD_COUNT = 5;

interface Props {
  events: EventWithRoutesViewEntity[];
}

const TrendEventsSwiperView = ({ events }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const cardCount = events.length;
  const extendedEvents =
    cardCount < MIN_CARD_COUNT ? extendArray(events) : events;

  return (
    <>
      <div className={'relative -mx-16 h-[309px] w-[calc(100%+32px)]'}>
        <div
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <Swiper
            ref={swiper}
            pagination={true}
            slidesPerView="auto"
            navigation={true}
            loop={true}
            centeredSlides={true}
            className="relative w-full"
            onInit={() => setIsLoaded(true)}
          >
            {extendedEvents?.map((v, idx) => (
              <SwiperSlide key={v.eventId + idx} style={{ width: 'auto' }}>
                <div className="pr-[6px]">
                  <Card
                    variant={'LARGE'}
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
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TrendEventsSwiperView;

const extendArray = <T,>(arr: T[]): T[] => {
  if (arr.length === 0) {
    return [];
  }

  const result: T[] = [];
  while (result.length < MIN_CARD_COUNT) {
    result.push(...arr);
  }
  return result;
};
