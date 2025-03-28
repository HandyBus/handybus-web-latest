'use client';

import Badge from '@/components/badge/Badge';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import { checkIsReservationOpen } from '../event.util';

interface Props {
  event: EventWithRoutesViewEntity;
}

const EventInfo = ({ event }: Props) => {
  const parsedDateString = dateString(
    event.dailyEvents.map((v) => v.date),
    {
      showWeekday: false,
    },
  );

  const isReservationOpen = checkIsReservationOpen(event);

  return (
    <>
      <section className="flex flex-col px-16 py-24">
        <h1 className="mb-4 break-keep text-20 font-700">{event.eventName}</h1>
        <h3 className="mb-[2px] text-16 font-500 text-basic-grey-700">
          {parsedDateString}
        </h3>
        <h4 className="mb-4 text-16 font-500 text-basic-grey-500">
          {event.eventLocationName}
        </h4>
        {isReservationOpen ? (
          <h5 className="text-20 font-600">
            {event.minRoutePrice?.toLocaleString()}원~
          </h5>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-20 font-600 text-basic-grey-500">
              판매 대기
            </span>
            <Badge className="bg-basic-blue-100 text-basic-blue-400">
              수요조사 진행 중
            </Badge>
          </div>
        )}
      </section>
      <div className="h-8 w-full bg-basic-grey-50" />
    </>
  );
};

export default EventInfo;
