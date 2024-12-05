import Image from 'next/image';
import Link from 'next/link';
import { EventDetailProps } from '@/types/event.types';
import dateString from '@/utils/dateString';

const DemandView = ({ event }: { event: EventDetailProps }) => {
  return (
    // TODO check href
    <Link href={`/demand/${event.id}`} className="px-16 py-12">
      <article className="flex flex-row gap-16">
        <figure className="relative min-h-[110px] min-w-[80px] overflow-hidden rounded-[8px] bg-grey-300">
          <Image
            className="object-cover"
            src={event.image}
            alt={`콘서트 ${event.name}의 포스터`}
            fill
          />
        </figure>

        <div className="max-h-[110px] overflow-hidden">
          <h1 className="line-clamp-2 overflow-hidden overflow-ellipsis  text-16 font-500 text-grey-900">
            {event.name}
          </h1>
          <div className="flex flex-col gap-4">
            <span className="line-clamp-1 overflow-hidden overflow-ellipsis text-12 font-400 text-grey-900">
              {event.destination.name}
            </span>
            <span className="line-clamp-1 overflow-hidden overflow-ellipsis text-12 font-400 text-grey-900">
              {dateString(event.dailyShuttles.map((ds) => new Date(ds.date)))}
            </span>
            <span className="line-clamp-1 overflow-hidden overflow-ellipsis text-12 font-400  text-grey-500">
              {event.participants.map((p) => p.name).join(', ')}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default DemandView;
