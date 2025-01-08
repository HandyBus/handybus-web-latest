import { ShuttleRouteType } from '@/types/shuttle.types';
import { parseDateString } from '@/utils/dateString';
import Image from 'next/image';
import Link from 'next/link';

const ShuttleRouteView = ({
  shuttleRoute,
}: {
  shuttleRoute: ShuttleRouteType;
}) => {
  const dailyShuttle = shuttleRoute.shuttle.dailyShuttles.find(
    (d) => d.dailyShuttleId === shuttleRoute.dailyShuttleId,
  );

  if (!dailyShuttle) {
    console.error('dailyShuttle not found', shuttleRoute.dailyShuttleId);
    return null;
  }

  return (
    <Link
      href={`/reservation/${shuttleRoute.shuttleId}?dailyShuttleId=${shuttleRoute.dailyShuttleId}&shuttleRouteId=${shuttleRoute.shuttleRouteId}`}
      className="flex flex-row gap-16 px-16 py-12"
    >
      <div className="relative max-h-[110px] min-h-[110px] min-w-[80px] max-w-[80px] overflow-hidden rounded-[8px] bg-grey-50">
        <Image
          className="object-cover"
          src={shuttleRoute.shuttle.image}
          alt={`콘서트 ${shuttleRoute.shuttle.image}의 포스터`}
          fill
        />
      </div>
      <div className="flex h-[110px] flex-col gap-4 overflow-hidden">
        <div className="line-clamp-1 text-16 font-500 text-grey-900">
          {shuttleRoute.shuttle.name}
        </div>
        <div className="text-12 font-400">
          <div className="line-clamp-1 text-grey-900">
            {shuttleRoute.shuttle.destination.name}
          </div>
          <div className="line-clamp-1 text-grey-900">
            {parseDateString(dailyShuttle.date)} 셔틀
          </div>
          <div className="line-clamp-1 text-grey-500">{shuttleRoute.name}</div>
        </div>
        <div className="line-clamp-1 text-14 font-500 text-grey-900">
          <SeatString shuttle={shuttleRoute} />
        </div>
      </div>
    </Link>
  );
};

export default ShuttleRouteView;

const SeatString = ({ shuttle }: { shuttle: ShuttleRouteType }) => {
  let prefix: string;

  switch (shuttle.remainingSeatType) {
    case 'FROM_DESTINATION':
      prefix = `콘서트행 잔여석`;
      break;
    case 'TO_DESTINATION':
      prefix = `귀가행 잔여석`;
      break;
    case 'ROUND_TRIP':
      prefix = `잔여석`;
      break;
  }

  return (
    <>
      {prefix}{' '}
      <span className="text-primary-main">{shuttle.remainingSeatCount}석</span>{' '}
      / {shuttle.maxPassengerCount}석
    </>
  );
};
