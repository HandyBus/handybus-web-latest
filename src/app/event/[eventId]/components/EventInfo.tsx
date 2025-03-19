'use client';

import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';

interface Props {
  event: EventsViewEntity;
}

const EventInfo = ({ event }: Props) => {
  const parsedDateString = dateString(event.dailyEvents.map((v) => v.date));

  return (
    <>
      <section className="flex flex-col px-16 py-24">
        <h1 className="mb-4 break-keep text-20 font-700">{event.eventName}</h1>
        <h3 className="mb-[2px] text-16 font-500 text-basic-grey-700">
          {parsedDateString}
        </h3>
        <h4 className="mb-4 text-14 font-500 text-basic-grey-500">
          {event.eventLocationName}
        </h4>
        {/* TODO: 추후 최소 가격 api 연동 */}
        <h5 className="text-20 font-600">32,000원~</h5>
      </section>
      <div className="h-8 w-full bg-basic-grey-50" />
    </>
  );
};

export default EventInfo;
