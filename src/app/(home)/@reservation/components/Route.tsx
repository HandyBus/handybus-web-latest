import { ShuttleRouteType } from '@/types/shuttle.types';
import dateString, { ddayString } from '@/utils/dateString';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  route: ShuttleRouteType;
}

const Shuttle = ({ route }: Props) => {
  return (
    <Link
      href={`/reservation/${route.shuttleId}?dailyShuttleId=${route.dailyShuttleId}&shuttleRouteId=${route.shuttleRouteId}`}
    >
      <div className="flex w-220 flex-col gap-8">
        <div className="relative h-280 w-220 overflow-hidden rounded-[12px] bg-grey-600">
          <Image
            className="animate-fade object-cover"
            src={route.shuttle.image}
            alt={`콘서트 ${route.shuttle.name}의 포스터`}
            fill
          />
          <div className="absolute left-8 top-8 rounded-full bg-white px-8 py-[1px] text-12 font-500 text-grey-600-sub">
            {ddayString(new Date(route.reservationDeadline))}
          </div>
          <SeatString route={route} />
        </div>
        <div className="flex flex-col gap-4 pl-4">
          <span className="line-clamp-2 text-16 font-600 text-grey-900">
            {route.shuttle.name}
          </span>
          <div className="flex flex-col text-12 font-400">
            <span className="text-black">{route.shuttle.destination.name}</span>
            <span className="text-grey-900">
              {dateString(
                new Date(
                  route.shuttle.dailyShuttles.find(
                    (v) => v.dailyShuttleId === route.dailyShuttleId,
                  )?.date || '',
                ),
              )}{' '}
              셔틀
            </span>
            <span className="text-grey-500">{route.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Shuttle;

interface SeatStringProps {
  route: ShuttleRouteType;
}

const SeatString = ({ route }: SeatStringProps) => {
  let prefix: string;
  switch (route.remainingSeatType) {
    case 'FROM_DESTINATION':
      prefix = `콘서트행 잔여석`;
      break;
    case 'TO_DESTINATION':
      // TODO check if this term is correct
      prefix = `귀가행 잔여석`;
      break;
    case 'ROUND_TRIP':
      prefix = `잔여석`;
      break;
  }

  return (
    <div
      // TODO '콘서트행' 처리
      className="absolute bottom-0 w-full bg-black bg-opacity-70 px-16 py-12 text-right text-14 font-500 text-white backdrop-blur-[2px]"
    >
      {prefix}{' '}
      <span className="text-primary-main">{route.remainingSeatCount}석</span> /{' '}
      {route.maxPassengerCount}석
    </div>
  );
};
