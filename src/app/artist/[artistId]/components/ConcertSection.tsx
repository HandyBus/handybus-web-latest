'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import type { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  eventList: EventsViewEntity[];
}

const ConcertSection = ({ eventList }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (eventList.length === 0) return null;

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
            {eventList.map((event) => (
              <SwiperSlide key={event.eventId} style={{ width: 'auto' }}>
                <div className="pr-12">
                  <ConcertCard event={event} />
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
  event: EventsViewEntity;
}

const ConcertCard = ({ event }: ConcertCardProps) => {
  const todayKR = dayjs().tz('Asia/Seoul').startOf('day');

  const isUpcoming =
    (event.dailyEvents ?? []).length > 0 &&
    (event.dailyEvents ?? []).every(
      (de) => !dayjs(de.dailyEventDate).isBefore(todayKR, 'day'),
    );

  return (
    <Link href={`/event/${event.eventId}`} className="block w-[145px]">
      <div className="relative h-[193px] w-[145px] overflow-hidden rounded-8 bg-basic-grey-200">
        <Image
          src={event.eventOfficialPosterImageUrl ?? DEFAULT_EVENT_IMAGE}
          alt={event.eventOfficialName}
          fill
          className="object-cover"
          sizes="145px"
        />
        {isUpcoming && (
          <div className="bg-black/20 absolute inset-0 flex items-center justify-center">
            <span className="bg-black/50 rounded-4 px-8 py-4 text-12 font-600 text-basic-white">
              공연 예정
            </span>
          </div>
        )}
      </div>
      <div className="pt-8">
        <p className="line-clamp-2 break-all text-14 font-600 leading-[140%] text-basic-black">
          {event.eventOfficialName}
        </p>
        <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
          {dateString(
            event.startDate === event.endDate
              ? event.startDate
              : [event.startDate, event.endDate],
            { showWeekday: false },
          )}
        </p>
      </div>
    </Link>
  );
};
