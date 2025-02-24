import Link from 'next/link';
import Image from 'next/image';
import { dateString } from '@/utils/dateString.util';
import { Event } from '@/types/shuttle-operation.type';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import dayjs from 'dayjs';

interface Props {
  event: Event;
}

const DemandCard = ({ event }: Props) => {
  const dates = event.dailyEvents.map((v) => v.date);

  console.log(
    dayjs(dates[0]).tz('Asia/Seoul').format('YYYY-MM-DD'),
    dayjs(dates[0]).tz(),
  );

  return (
    <Link href={`/demand/${event.eventId}`}>
      <div className="flex flex-row gap-16 px-16 py-12">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[80px] max-w-[80px] overflow-hidden rounded-[8px] bg-grey-50">
          <Image
            className="object-cover"
            src={event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt={`${event.eventName}의 포스터`}
            fill
          />
        </div>
        <div className="flex h-[110px] flex-col gap-4 overflow-hidden">
          <div className="line-clamp-2 text-16 font-500 text-grey-900">
            {event.eventName}
          </div>
          <div className="text-12 font-400">
            <div className="line-clamp-1 text-grey-900">
              {event.eventLocationName}
            </div>
            <div className="line-clamp-1 text-grey-900">
              {dateString(dates)}
            </div>
            <div className="line-clamp-1 text-grey-500">
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
