'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import Card from '@/components/card/Card';
import { EventsViewEntity } from '@/types/event.type';
import Image from 'next/image';
import { useIsApp } from '@/hooks/useEnvironment';

const MIN_CARD_COUNT = 5;

interface Props {
  events: EventsViewEntity[];
}

const TrendEventsSwiperView = ({ events }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const isApp = useIsApp();

  const statusBarPaddingClass = isApp ? 'top-[calc(-136px)]' : '';

  const cardCount = events.length;
  const extendedEvents =
    cardCount < MIN_CARD_COUNT ? extendArray(events) : events;

  const handleSlideChange = (swiper: SwiperType) => {
    // loop를 사용하고있어서 인덱스가 무한히 늘어납니다 그래서 원본 데이터의 인덱스를 판별합니다.
    const realIndex = swiper.realIndex % events.length;
    const activeEvent = events[realIndex];
    setActiveImage(activeEvent?.eventImageUrl || null);
  };

  return (
    <div className="relative pt-24">
      {/* 블러 처리된 배경 이미지 */}
      {activeImage && (
        <div
          className={`absolute left-0 right-0 top-[calc(-80px)] h-[calc(400px)] ${statusBarPaddingClass}`}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={activeImage}
              alt="background"
              fill
              className="object-cover blur-[100px] "
              priority
            />
            {/* 흰색 페이드 오버레이 */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0.5) 90%, #ffffff 100%)',
              }}
            />
          </div>
        </div>
      )}

      <div className={'relative -mx-16 h-[309px] w-[calc(100%+32px)] px-16'}>
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
            onInit={(swiper) => {
              setIsLoaded(true);
              handleSlideChange(swiper);
            }}
            onSlideChange={handleSlideChange}
          >
            {extendedEvents?.map((v: EventsViewEntity, idx: number) => (
              <SwiperSlide key={v.eventId + idx} style={{ width: 'auto' }}>
                <div className="pr-[16px]">
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
