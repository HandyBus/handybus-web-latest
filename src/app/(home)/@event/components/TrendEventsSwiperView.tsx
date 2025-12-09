'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Card from '@/components/card/Card';
import { EventsViewEntity } from '@/types/event.type';
import Image from 'next/image';

const MIN_CARD_COUNT = 5;

interface Props {
  events: EventsViewEntity[];
}

const TrendEventsSwiperView = ({ events }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardCount = events.length;
  const extendedEvents =
    cardCount < MIN_CARD_COUNT ? extendArray(events) : events;

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex % events.length;
    setActiveIndex(realIndex);
  };

  return (
    <div className="relative pt-24">
      <div className="absolute inset-x-0 top-0 h-[320px] select-none">
        <div className="relative h-[320px] w-full overflow-hidden">
          {/* 모든 배경 이미지를 미리 렌더링 (blur 없이) */}
          {events.map((event, idx) => (
            <div
              key={`bg-${event.eventId}-${idx}`}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={event.eventImageUrl}
                alt="background Image"
                fill
                className="object-cover"
                priority={idx === 0}
                quality={10}
              />
            </div>
          ))}

          {/* Blur 오버레이 */}
          <div className="absolute inset-0 backdrop-blur-[100px]" />

          {/* 흰색 페이드 오버레이 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.2) 85%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.5) 95%, #ffffff 100%)',
            }}
          />
        </div>
      </div>
      <div className={'relative h-[309px] w-full'}>
        <div
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          // className={`${isLoaded ? 'block' : 'hidden'}`}
        >
          <Swiper
            ref={swiper}
            pagination={true}
            slidesPerView="auto"
            navigation={true}
            loop={true}
            centeredSlides={true}
            className="relative w-full"
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            onInit={(swiper) => {
              setIsLoaded(true);
              handleSlideChange(swiper);
            }}
            onSlideChange={handleSlideChange}
          >
            {extendedEvents?.map((v: EventsViewEntity, idx: number) => (
              <SwiperSlide key={v.eventId + idx} style={{ width: 'auto' }}>
                <div className="pr-[12px]">
                  <Card
                    variant={'LARGE'}
                    image={v.eventImageUrl}
                    title={v.eventName}
                    date={v.startDate}
                    location={v.eventLocationName}
                    price={`${v.eventMinRoutePrice?.toLocaleString()}원 ~`}
                    isSaleStarted={v.eventMinRoutePrice !== null}
                    order={(idx % cardCount) + 1}
                    href={`/event/${v.eventId}`}
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
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
