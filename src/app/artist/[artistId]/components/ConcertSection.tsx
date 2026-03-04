'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export type ConcertStatus = 'UPCOMING' | 'NORMAL';

export interface ConcertItem {
  eventId: string;
  eventName: string;
  eventImageUrl: string | null;
  concertStatus: ConcertStatus;
  startDate: string;
  endDate: string;
}

interface Props {
  concerts: ConcertItem[];
}

const STATUS_LABEL: Record<ConcertStatus, string> = {
  UPCOMING: '공연 예정',
  NORMAL: '',
};

const ConcertSection = ({ concerts }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (concerts.length === 0) return null;

  return (
    <section className="py-24">
      <h3 className="pb-16 pl-16 text-18 font-700 leading-[140%]">콘서트</h3>
      <div className="relative -mx-0 w-full">
        <div
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <Swiper
            slidesPerView="auto"
            className="relative w-full"
            onInit={() => setIsLoaded(true)}
          >
            <SwiperSlide style={{ width: 'auto' }}>
              <div className="w-16" />
            </SwiperSlide>
            {concerts.map((concert) => (
              <SwiperSlide key={concert.eventId} style={{ width: 'auto' }}>
                <div className="pr-12">
                  <ConcertCard concert={concert} />
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide style={{ width: 'auto' }}>
              <div className="w-4" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ConcertSection;

interface ConcertCardProps {
  concert: ConcertItem;
}

const ConcertCard = ({ concert }: ConcertCardProps) => {
  return (
    <Link href={`/event/${concert.eventId}`} className="block w-[145px]">
      <div className="relative h-[193px] w-[145px] overflow-hidden rounded-8 bg-basic-grey-200">
        {concert.concertStatus === 'UPCOMING' && (
          <div className="bg-black/20 absolute inset-0 flex items-center justify-center">
            <span className="bg-black/50 rounded-4 px-8 py-4 text-12 font-600 text-basic-white">
              {STATUS_LABEL['UPCOMING']}
            </span>
          </div>
        )}
      </div>
      <div className="pt-8">
        <p className="line-clamp-2 break-all text-14 font-600 leading-[140%] text-basic-black">
          {concert.eventName}
        </p>
        <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
          {concert.startDate} - {concert.endDate}
        </p>
      </div>
    </Link>
  );
};
