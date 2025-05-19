'use client';

import { useMemo } from 'react';
import DemandCard from './DemandCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserDemandsWithPagination } from '@/services/demand.service';
import usePeriodFilter from '../../../components/period-filter-bar/hooks/usePeriodFilter';
import PeriodFilterBar from '../../../components/period-filter-bar/PeriodFilterBar';
const EmptyView = dynamic(() => import('./EmptyView'));

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
            <ul>
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
