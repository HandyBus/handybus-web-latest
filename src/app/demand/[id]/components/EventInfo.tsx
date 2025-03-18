'use client';

import EventStatusChip from '@/components/chips/event-status-chip/EventStatusChip';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';

type Props = {
  event: EventsViewEntity;
};

const EventInfo = ({ event }: Props) => {
  const parsedDateString = dateString(event.dailyEvents.map((v) => v.date));

  return (
    <article className="px-16 py-24">
      <EventStatusChip status={event.eventStatus} />
      <h1 className="pb-24 pt-8 text-24 font-700 leading-[33.6px] text-grey-700">
        {event.eventName}
      </h1>
      <dl className="flex flex-col gap-8">
        <Badge
          label="아티스트"
          value={event.eventArtists
            ?.map((artist) => artist.artistName)
            .join(', ')}
        />
        <Badge label="일자" value={parsedDateString} />
        <Badge label="장소" value={event.eventLocationName} />
      </dl>
    </article>
  );
};

export default EventInfo;

interface BadgeProps {
  label: string;
  value: string | undefined;
}

const Badge = ({ label, value }: BadgeProps) => {
  if (!value) {
    return null;
  }
  return (
    <div className="flex gap-12">
      <dt className="h-[21px] w-72 rounded-xl border border-grey-100 text-center text-12 font-500 leading-[21px] text-grey-600">
        {label}
      </dt>
      <dd className="text-14 font-400 leading-[22.4px] text-grey-600">
        {value}
      </dd>
    </div>
  );
};
