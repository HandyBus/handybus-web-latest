'use client';

import { useMemo } from 'react';
import DemandCard from './DemandCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserDemandsWithPagination } from '@/services/demand.service';
import usePeriodFilter from '../period-filter-bar/hooks/usePeriodFilter';
import PeriodFilterBar from '../period-filter-bar/PeriodFilterBar';
import { useGetUserAlertRequestsWithPagination } from '@/services/alertRequest.service';
import { customTwMerge } from 'tailwind.config';
import Link from 'next/link';
import ArrowRightIcon from '../../icons/arrow-right-grey.svg';
const EmptyView = dynamic(() => import('./EmptyView'));

const DemandTab = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  const { data: demandPages, isLoading: isDemandsLoading } =
    useGetUserDemandsWithPagination({
      monthsAgo: periodFilter === 'ALL' ? undefined : periodFilter,
    });
  const { data: alertRequests, isLoading: isAlertRequestsLoading } =
    useGetUserAlertRequestsWithPagination();

  const isLoading = isDemandsLoading || isAlertRequestsLoading;

  const demands = useMemo(
    () => demandPages?.pages?.[0]?.shuttleDemands ?? [],
    [demandPages],
  );

  const isAlertRequestAvailable = useMemo(() => {
    return alertRequests
      ? alertRequests.pages.flatMap((page) => page.shuttleRouteAlertRequests)
          .length > 0
      : false;
  }, [alertRequests]);

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
        {demands && alertRequests && (
          <>
            <section
              className={customTwMerge(
                'flex w-full flex-col gap-8 px-16 pb-16',
                !isAlertRequestAvailable && 'hidden',
              )}
            >
              {isAlertRequestAvailable && (
                <Link
                  href="/mypage/alert-requests"
                  className="flex h-48 w-full items-center justify-between rounded-8 border border-basic-blue-200 bg-basic-blue-100 px-16 py-12"
                >
                  <span className="text-14 font-600 text-basic-blue-400">
                    빈자리 알림을 신청한 행사가 있어요.
                  </span>
                  <ArrowRightIcon />
                </Link>
              )}
            </section>
            {demands.length === 0 ? (
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
            )}
          </>
        )}
      </DeferredSuspense>
    </>
  );
};

export default DemandTab;
