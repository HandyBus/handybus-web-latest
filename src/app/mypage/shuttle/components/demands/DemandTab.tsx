'use client';

import { useMemo } from 'react';
import DemandCard from './DemandCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserDemandsWithPagination } from '@/services/demand.service';
import usePeriodFilter from '../period-filter-bar/hooks/usePeriodFilter';
import PeriodFilterBar from '../period-filter-bar/PeriodFilterBar';
const EmptyView = dynamic(() => import('../reservations/EmptyView'));

const DemandTab = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: demandPages, isLoading } = useGetUserDemandsWithPagination({
    monthsAgo: periodFilter,
  });
  const demands = useMemo(
    () => demandPages?.pages?.[0]?.shuttleDemands ?? [],
    [demandPages],
  );

  return (
    <>
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {demands &&
          (demands.length === 0 ? (
            <EmptyView />
          ) : (
            <ul>
              <PeriodFilterBar
                periodFilter={periodFilter}
                setPeriodFilter={setPeriodFilter}
              />
              {demands?.map((demand) => (
                <DemandCard key={demand.shuttleDemandId} demand={demand} />
              ))}
            </ul>
          ))}
      </DeferredSuspense>
    </>
  );
};

export default DemandTab;
