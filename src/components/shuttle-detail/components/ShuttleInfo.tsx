'use client';

import RouteStatusChip from '@/components/chips/shuttle-status-chip/RouteStatusChip';
import { RouteStatusType, ShuttleType } from '@/types/shuttle.types';
import { parseDateString } from '@/utils/dateString';

interface Props {
  shuttle: ShuttleType;
  status: RouteStatusType;
}

export const ShuttleInfo = ({ shuttle, status }: Props) => {
  const minDate = shuttle.dailyShuttles.reduce((min, curr) => {
    return min.date < curr.date ? min : curr;
  });
  const maxDate = shuttle.dailyShuttles.reduce((max, curr) => {
    return max.date > curr.date ? max : curr;
  });
  const parsedDateString =
    parseDateString(minDate.date) + ' ~ ' + parseDateString(maxDate.date);

  return (
    <article className="px-16 py-24">
      <RouteStatusChip status={status} />
      <h1 className="pb-24 pt-8 text-24 font-700 leading-[33.6px] text-grey-900">
        {shuttle.name}
      </h1>
      <dl className="info-list">
        <Badge
          label="아티스트"
          value={shuttle.participants.map((v) => v.name).join(', ')}
        />
        <Badge label="일자" value={parsedDateString} />
        <Badge label="장소" value={shuttle.destination.name} />
      </dl>
    </article>
  );
};

const Badge = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-12">
      <dt className="h-[21px] w-72 rounded-xl border border-grey-100 text-center text-12 font-500 leading-[21px] text-grey-600">
        {label}
      </dt>
      <dd className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
        {value}
      </dd>
    </div>
  );
};
