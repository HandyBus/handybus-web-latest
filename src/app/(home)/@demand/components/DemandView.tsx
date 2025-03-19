import Image from 'next/image';
import Link from 'next/link';
import { dateString } from '@/utils/dateString.util';
import { EventsViewEntity } from '@/types/event.type';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';

interface Props {
  event: EventsViewEntity;
}

const DemandView = ({ event }: Props) => {
  return (
    <Link href={`/demand/${event.eventId}`} className="px-16 py-8">
      <article className="flex flex-row gap-16">
        <figure className="relative min-h-[110px] min-w-[80px] overflow-hidden rounded-[8px] bg-basic-grey-300">
          <Image
            className="object-cover"
            src={event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt={`콘서트 ${event.eventName}의 포스터`}
            fill
          />
        </figure>

        <div className="max-h-[110px] overflow-hidden">
          <h1 className="line-clamp-2 overflow-hidden overflow-ellipsis  text-16 font-500 text-basic-grey-700">
            {event.eventName}
          </h1>
          <div className="flex flex-col gap-4">
            <span className="line-clamp-1 overflow-hidden overflow-ellipsis text-12 font-400 text-basic-grey-700">
              {event.eventLocationName}
            </span>
            <span className="line-clamp-1 overflow-hidden overflow-ellipsis text-12 font-400 text-basic-grey-700">
              {dateString(
                event.dailyEvents?.map((dailyEvent) => dailyEvent.date),
              )}
            </span>
            <span className="line-clamp-1 overflow-hidden overflow-ellipsis text-12 font-400  text-basic-grey-500">
              {event.eventArtists
                ?.map((artist) => artist.artistName)
                .join(', ')}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default DemandView;
