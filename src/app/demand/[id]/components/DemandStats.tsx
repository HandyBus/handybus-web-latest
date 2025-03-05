'use client';

import {
  useGetAllEventDemandStats,
  useGetEventDemandStats,
} from '@/services/shuttle-operation.service';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';

interface Props {
  eventId: string;
  dailyEvent?: DailyEventsInEventsViewEntity;
  location: string;
  bigRegion?: string;
  smallRegion?: string;
}

const DemandStats = ({
  eventId,
  dailyEvent,
  location,
  bigRegion,
  smallRegion,
}: Props) => {
  const { data: eventDemandStats } = useGetEventDemandStats(
    eventId,
    dailyEvent?.dailyEventId ?? '',
    { provinceFullName: bigRegion, cityFullName: smallRegion },
  );

  const { data: allEventDemandStats } = useGetAllEventDemandStats(eventId);

  const demandStats = dailyEvent ? eventDemandStats : allEventDemandStats;

  const region =
    bigRegion && smallRegion ? bigRegion + ' ' + smallRegion : undefined;

  return (
    <article className="px-16 py-24">
      <header className="flex flex-col gap-4 py-16">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          수요 신청한 사람들
        </h2>
        <p className="pb-16 pt-4 text-14 font-500 leading-[22.4px] text-grey-500">
          이번 콘서트를 위해{' '}
          <span className="text-grey-700">
            {dailyEvent ? dateString(dailyEvent.date) : '전체'}
          </span>
          {region ? (
            <>
              에 <span className="text-grey-700">{region}</span>를 지나는{' '}
            </>
          ) : (
            ' '
          )}
          셔틀에 대한 수요 신청 현황을 보여드려요.
        </p>
      </header>
      <section className="flex flex-col gap-12">
        <EventCard
          tripType="왕복"
          count={demandStats?.roundTripCount}
          region={region}
          location={location}
        />
        <EventCard
          tripType="가는 편"
          count={demandStats?.toDestinationCount}
          region={region}
          location={location}
        />
        <EventCard
          tripType="오는 편"
          count={demandStats?.fromDestinationCount}
          region={region}
          location={location}
        />
      </section>
    </article>
  );
};

export default DemandStats;

interface EventCardProps {
  tripType?: '왕복' | '가는 편' | '오는 편';
  count?: number;
  region?: string;
  location?: string;
}

const EventCard = ({ tripType, count, region, location }: EventCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#F8F8F8] px-16 py-20">
      <div>
        <span>
          <p className="text-16 font-600 leading-[25.6px] text-grey-800">
            {tripType}
          </p>
        </span>
        {region && location && (
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              {displayRouteInfo(tripType, location, region)}
            </p>
          </span>
        )}
      </div>
      {count !== undefined && (
        <div className="flex items-baseline gap-4">
          <span className="text-24 font-700 leading-[38.4px] text-grey-900">
            {count}
          </span>
          <span className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
            명
          </span>
        </div>
      )}
    </div>
  );
};

export const displayRouteInfo = (
  tripType: '왕복' | '가는 편' | '오는 편' | undefined,
  destination: string,
  region?: string,
) => {
  if (!region) return;
  if (tripType === '왕복') return `${region} ↔ ${destination}`;
  if (tripType === '가는 편') return `${region} → ${destination}`;
  if (tripType === '오는 편') return `${destination} → ${region}`;
};
