'use client';

import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  route: ShuttleRoutesViewEntity;
}

const Shuttle = ({ route }: Props) => {
  return (
    <Link
      href={`/reservation/${route.eventId}?dailyEventId=${route.dailyEventId}&shuttleRouteId=${route.shuttleRouteId}`}
    >
      <div className="flex w-220 flex-col gap-8">
        <div className="relative h-280 w-220 overflow-hidden rounded-[12px] bg-grey-600">
          <Image
            className="animate-fade object-cover"
            src={route.event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt={`${route.event.eventName}의 포스터`}
            fill
          />
          <SeatString route={route} />
        </div>
        <div className="flex flex-col gap-4 pl-4">
          <span className="line-clamp-2 text-16 font-600 text-grey-900">
            [{route.name}]{' '}
            <span className="font-500">{route.event.eventName}</span>
          </span>
          <div className="flex flex-col text-12 font-400">
            <span className="text-black">{route.event.eventLocationName}</span>
            <span className="text-grey-900">
              {dateString(
                route.event.dailyEvents.find(
                  (v) => v.dailyEventId === route.dailyEventId,
                )?.date,
              )}{' '}
              셔틀
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Shuttle;

interface SeatStringProps {
  route: ShuttleRoutesViewEntity;
}

const SeatString = ({ route }: SeatStringProps) => {
  let prefix: string;
  switch (route.remainingSeatType) {
    case 'TO_DESTINATION':
      prefix = '가는 편 잔여석';
      break;
    case 'FROM_DESTINATION':
      prefix = '오는 편 잔여석';
      break;
    case 'ROUND_TRIP':
      prefix = '잔여석';
      break;
  }

  const isSoldOut = route.remainingSeatCount === 0;

  return (
    <div className="absolute bottom-0 w-full bg-black bg-opacity-70 px-16 py-12 text-right text-14 font-500 text-white backdrop-blur-[2px]">
      {isSoldOut ? (
        <span className="text-grey-100">매진</span>
      ) : (
        <>
          {prefix}{' '}
          <span className="text-primary-main">
            {route.remainingSeatCount}석
          </span>
        </>
      )}
    </div>
  );
};
