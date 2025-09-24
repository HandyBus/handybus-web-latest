import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import Image from 'next/image';

interface Props {
  event: EventsViewEntity;
}

const EventInfoSection = ({ event }: Props) => {
  const formattedDate = dateString(
    event.startDate === event.endDate
      ? event.startDate
      : [event.startDate, event.endDate],
    {
      showWeekday: false,
    },
  );
  const formattedMinPrice = event.eventMinRoutePrice?.toLocaleString();
  return (
    <section className="px-16 pb-24 pt-12">
      <h1 className="mb-24 text-22 font-700 leading-[140%]">예약 내역</h1>
      <div className="flex h-[112px] w-full gap-8">
        <div className="relative h-full w-[84px] shrink-0 overflow-hidden rounded-[7px]">
          <Image
            src={event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt="행사 포스터"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="line-clamp-2 text-16 font-600 leading-[140%]">
            {event.eventName}
          </h3>
          <p className="flex flex-col gap-[2px]">
            <span className="line-clamp-1 text-12 font-500 leading-[160%] text-basic-grey-700">
              {formattedDate}
            </span>
            <span className="line-clamp-1 text-14 font-500 leading-[160%] text-basic-grey-500">
              {event.eventLocationName}
            </span>
          </p>
          <p className="text-16 font-600 leading-[140%]">
            {formattedMinPrice}원~
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
