'use client';

import RouteStatusChip from '@/components/chips/route-status-chip/RouteStatusChip';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';

type Props = {
  route: ShuttleRoutesViewEntity;
};

const RouteInfo = ({ route }: Props) => {
  const parsedDateString = dateString(
    route.event.dailyEvents.map((v) => v.date),
  );

  return (
    <article className="px-16 py-24">
      <RouteStatusChip status={route.status} />
      <h1 className="pb-24 pt-8 text-24 font-700 leading-[33.6px] text-basic-grey-700">
        [{route.name}] {route.event.eventName}
      </h1>
      <dl className="flex flex-col gap-8">
        <Badge
          label="아티스트"
          value={route.event.eventArtists
            ?.map((artist) => artist.artistName)
            .join(', ')}
        />
        <Badge label="행사 일자" value={parsedDateString} />
        <Badge label="장소" value={route.event.eventLocationName} />
      </dl>
    </article>
  );
};

export default RouteInfo;

interface BadgeProps {
  label: string;
  value: string | undefined;
}

const Badge = ({ label, value }: BadgeProps) => {
  if (!value) {
    return null;
  }
  return (
    <div className="flex gap-12">
      <dt className="h-[21px] w-72 rounded-xl border border-basic-grey-100 text-center text-12 font-500 leading-[21px] text-basic-grey-600">
        {label}
      </dt>
      <dd className="text-14 font-400 leading-[22.4px] text-basic-grey-600">
        {value}
      </dd>
    </div>
  );
};
