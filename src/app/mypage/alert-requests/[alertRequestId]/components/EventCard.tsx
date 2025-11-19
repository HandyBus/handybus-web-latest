'use client';

import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { useFlow } from '@/stacks';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import Image from 'next/image';

interface Props {
  event: EventsViewEntity;
}

const EventCard = ({ event }: Props) => {
  const dates = event.dailyEvents.map((dailyEvent) => dailyEvent.date);
  const formattedEventDate = dateString(dates, {
    showWeekday: false,
  });

  const flow = useFlow();
  const handleRedirectToEventDetail = () => {
    flow.push('EventDetail', { eventId: event.eventId });
  };

  return (
    <button
      type="button"
      onClick={handleRedirectToEventDetail}
      className="mb-24 mt-16 flex h-[70px] shrink-0 gap-12 px-16 text-left"
    >
      <div className="relative h-full w-52 shrink-0 overflow-hidden rounded-4">
        <Image
          src={event.eventImageUrl ?? DEFAULT_EVENT_IMAGE}
          alt="행사 포스터"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="line-clamp-2 text-16 font-600">{event.eventName}</h2>
        <p className="text-12 font-500 text-basic-grey-700">
          {formattedEventDate}
        </p>
      </div>
    </button>
  );
};

export default EventCard;
