import Link from 'next/link';
import Image from 'next/image';
import { dateString } from '@/utils/dateString.util';
import { EventsViewEntity } from '@/types/event.type';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';

interface Props {
  event: EventsViewEntity;
}

const DemandCard = ({ event }: Props) => {
  const dates = event.dailyEvents.map((v) => v.date);

  return (
    <Link href={`/demand/${event.eventId}`}>
      <div className="flex flex-row gap-16 px-16 py-12">
        <div className="bg-basic-grey-50 relative max-h-[110px] min-h-[110px] min-w-[80px] max-w-[80px] overflow-hidden rounded-[8px]">
          <Image
            className="object-cover"
            src={event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt={`${event.eventName}의 포스터`}
            fill
          />
        </div>
        <div className="flex h-[110px] flex-col gap-4 overflow-hidden">
          <div className="text-basic-grey-700 line-clamp-2 text-16 font-500">
            {event.eventName}
          </div>
          <div className="text-12 font-400">
            <div className="text-basic-grey-700 line-clamp-1">
              {event.eventLocationName}
            </div>
            <div className="text-basic-grey-700 line-clamp-1">
              {dateString(dates)}
            </div>
            <div className="text-basic-grey-500 line-clamp-1">
              {event.eventArtists
                ?.map((artist) => artist.artistName)
                .join(', ')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DemandCard;
