'use client';

import { useMemo } from 'react';
import DemandCard from './DemandCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserDemandsWithPagination } from '@/services/demand.service';
import usePeriodFilter from '../period-filter-bar/hooks/usePeriodFilter';
import PeriodFilterBar from '../period-filter-bar/PeriodFilterBar';
const EmptyView = dynamic(() => import('./EmptyView'));

const DemandTab = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: demandPages, isLoading } = useGetUserDemandsWithPagination({
    monthsAgo: periodFilter === 'ALL' ? undefined : periodFilter,
  });
  const demands = useMemo(
    () => demandPages?.pages?.[0]?.shuttleDemands ?? [],
    [demandPages],
  );

  return (
    <>
      <PeriodFilterBar
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
      />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {demands &&
          (demands.length === 0 ? (
            <EmptyView />
          ) : (
            <ul className="flex flex-col gap-16 px-16 pb-16">
              {demands?.map((demand) => {
                const event = demand.event;
                const dailyEvent = event.dailyEvents.find(
                  (dailyEvent) =>
                    dailyEvent.dailyEventId === demand.dailyEventId,
                );
                if (!event || !dailyEvent) {
                  return null;
                }
                return (
                  <DemandCard
                    key={demand.shuttleDemandId}
                    demand={demand}
                    event={event}
                    dailyEvent={dailyEvent}
                  />
                );
              })}
            </ul>
          ))}
      </DeferredSuspense>
    </>
  );
};

export default DemandTab;
