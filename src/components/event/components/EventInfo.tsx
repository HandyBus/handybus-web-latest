'use client';

import EventStatusChip from '@/components/chips/event-status-chip/EventStatusChip';
import RouteStatusChip from '@/components/chips/route-status-chip/RouteStatusChip';
import {
  Event,
  EventStatus,
  ShuttleRouteStatus,
} from '@/types/v2-temp/shuttle-operation.type';
import { dateString } from '@/utils/dateString';

type Props = {
  event: Event;
} & (
  | {
      type: 'ROUTE';
      status: ShuttleRouteStatus;
    }
  | {
      type: 'EVENT';
      status: EventStatus;
    }
);

const EventInfo = ({ event, status, type }: Props) => {
  const parsedDateString = dateString(event.dailyEvents.map((v) => v.date));

  return (
    <article className="px-16 py-24">
      {type === 'ROUTE' && <RouteStatusChip status={status} />}
      {type === 'EVENT' && <EventStatusChip status={status} />}
      <h1 className="pb-24 pt-8 text-24 font-700 leading-[33.6px] text-grey-900">
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
      <dd className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
        {value}
      </dd>
    </div>
  );
};
