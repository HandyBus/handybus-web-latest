import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import Image from 'next/image';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import { useRouter } from 'next/navigation';

interface Props {
  event: EventsViewEntity;
}

const EventCard = ({ event }: Props) => {
  const dates = event.dailyEvents.map((dailyEvent) => dailyEvent.date);
  const formattedEventDate = dateString(dates, {
    showWeekday: false,
  });

  const router = useRouter();
  const redirectToEventDetail = handleClickAndStopPropagation(() => {
    router.push(`/event/${event.eventId}`);
  });

  return (
    <div className="mb-24 flex h-[70px] shrink-0 gap-12 px-16">
      <button
        type="button"
        className="relative h-full w-52 shrink-0 overflow-hidden rounded-4 text-left"
        onClick={redirectToEventDetail}
      >
        <Image
          src={event.eventImageUrl ?? DEFAULT_EVENT_IMAGE}
          alt="행사 포스터"
          fill
          className="object-cover"
        />
      </button>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={redirectToEventDetail}
          className="text-left"
        >
          <h2 className="line-clamp-2 text-16 font-600">{event.eventName}</h2>
        </button>
        <p className="text-grey-700 text-12 font-500">{formattedEventDate}</p>
      </div>
    </div>
  );
};

export default EventCard;
