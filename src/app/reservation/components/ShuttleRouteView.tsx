import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { ShuttleRoute } from '@/types/shuttle-operation.type';
import { dateString } from '@/utils/dateString.util';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  shuttleRoute: ShuttleRoute;
}

const ShuttleRouteView = ({ shuttleRoute }: Props) => {
  const dailyEvent = shuttleRoute.event.dailyEvents.find(
    (d) => d.dailyEventId === shuttleRoute.dailyEventId,
  );

  if (!dailyEvent) {
    console.error('dailyEvent not found', shuttleRoute.dailyEventId);
    return null;
  }

  return (
    <Link
      href={`/reservation/${shuttleRoute.event.eventId}?dailyEventId=${shuttleRoute.dailyEventId}&shuttleRouteId=${shuttleRoute.shuttleRouteId}`}
      className="flex flex-row gap-16 px-16 py-12"
    >
      <div className="relative max-h-[110px] min-h-[110px] min-w-[80px] max-w-[80px] overflow-hidden rounded-[8px] bg-grey-50">
        <Image
          className="object-cover"
          src={shuttleRoute.event.eventImageUrl || DEFAULT_EVENT_IMAGE}
          alt={`${shuttleRoute.event.eventName}의 포스터`}
          fill
        />
      </div>
      <div className="flex h-[110px] flex-col gap-4 overflow-hidden">
        <div className="line-clamp-1 text-16 font-500 text-grey-900">
          [{shuttleRoute.name}] {shuttleRoute.event.eventName}
        </div>
        <div className="text-12 font-400">
          <div className="line-clamp-1 text-grey-900">
            {shuttleRoute.event.eventLocationName}
          </div>
          <div className="line-clamp-1 text-grey-900">
            {dateString(dailyEvent.date)} 셔틀
          </div>
        </div>
        <div className="line-clamp-1 text-14 font-500 text-grey-900">
          <SeatString shuttleRoute={shuttleRoute} />
        </div>
      </div>
    </Link>
  );
};

export default ShuttleRouteView;

const SeatString = ({ shuttleRoute }: Props) => {
  let prefix: string;

  switch (shuttleRoute.remainingSeatType) {
    case 'TO_DESTINATION':
      prefix = `콘서트행 잔여석`;
      break;
    case 'FROM_DESTINATION':
      prefix = `귀가행 잔여석`;
      break;
    case 'ROUND_TRIP':
      prefix = `잔여석`;
      break;
  }

  return (
    <>
      {prefix}{' '}
      <span className="text-primary-main">
        {shuttleRoute.remainingSeatCount}석
      </span>{' '}
      / {shuttleRoute.maxPassengerCount}석
    </>
  );
};
