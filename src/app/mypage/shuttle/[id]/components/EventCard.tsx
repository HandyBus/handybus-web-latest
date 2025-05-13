import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  event: EventsViewEntity;
}

const EventCard = ({ event }: Props) => {
  const formattedEventDate = dateString([event.startDate, event.endDate], {
    showWeekday: false,
  });

  return (
    <Link
      href={`/event/${event.eventId}`}
      className="mb-24 flex h-[70px] shrink-0 gap-12 px-16"
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
        <p className="text-grey-700 text-12 font-500">{formattedEventDate}</p>
      </div>
    </Link>
  );
};

export default EventCard;
