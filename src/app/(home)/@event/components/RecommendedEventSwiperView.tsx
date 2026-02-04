'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import 'swiper/css';
import Card from '@/components/card/Card';
import ViewAllButton from '@/app/(home)/@event/components/ViewAllButton';
import Link from 'next/link';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import { useGetEventCheerCampaignByEventId } from '@/services/cheer.service';

interface Props {
  events: EventsViewEntity[];
}

const RecommendedEventSwiperView = ({ events }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={'relative -mx-16 h-304 w-[calc(100%+32px)]'}>
      <div
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Swiper
          ref={swiper}
          pagination={true}
          slidesPerView="auto"
          navigation={true}
          className="relative w-full"
          onInit={() => setIsLoaded(true)}
        >
          <SwiperSlide style={{ width: 'auto' }}>
            <div className="w-16" />
          </SwiperSlide>
          {events?.map((v, idx) => {
            const formattedDate = dateString(
              v.startDate === v.endDate
                ? v.startDate
                : [v.startDate, v.endDate],
              {
                showWeekday: false,
              },
            );
            const isImportant = idx < 4;
            return (
              <SwiperSlide key={v.eventId} style={{ width: 'auto' }}>
                <div className="pr-[6px]">
                  <EventCard
                    event={v}
                    formattedDate={formattedDate}
                    isImportant={isImportant}
                    order={idx + 1}
                  />
                </div>
              </SwiperSlide>
            );
          })}
          {
            <SwiperSlide style={{ width: 'auto' }}>
              <Link
                href="/event?from=home"
                className="group flex h-[300px] w-92 cursor-pointer flex-col items-center gap-[8px] pr-[6px]
    pt-72
    transition-colors"
              >
                <ViewAllButton />
                <p className="text-14 font-600 leading-[160%] text-basic-grey-600">
                  전체보기
                </p>
              </Link>
            </SwiperSlide>
          }
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedEventSwiperView;

interface EventCardProps {
  event: EventsViewEntity;
  formattedDate: string;
  isImportant: boolean;
  order: number;
}

const EventCard = ({
  event,
  formattedDate,
  isImportant,
  order,
}: EventCardProps) => {
  const { data: eventCheerCampaign } = useGetEventCheerCampaignByEventId(
    event.eventId,
  );

  const showEventCampaignOngoingBadge =
    event.eventStatus === 'STAND_BY' && !!eventCheerCampaign;

  return (
    <Card
      variant={'MEDIUM'}
      image={event.eventImageUrl}
      title={event.eventName}
      date={formattedDate}
      location={event.eventLocationName}
      price={`${event.eventMinRoutePrice?.toLocaleString()}원 ~`}
      showPrice={event.eventMinRoutePrice !== null}
      showEventCampaignOngoingBadge={showEventCampaignOngoingBadge}
      order={order}
      href={`/event/${event.eventId}`}
      priority={isImportant}
    />
  );
};
