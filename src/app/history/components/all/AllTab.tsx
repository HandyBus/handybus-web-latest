'use client';

import { useMemo } from 'react';
import DemandCard from '../demands/DemandCard';
import ReservationCard from '../reservations/ReservationCard';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserDemandsWithPagination } from '@/services/demand.service';
import { useGetUserReservations } from '@/services/reservation.service';
import usePeriodFilter from '../period-filter-bar/hooks/usePeriodFilter';
import PeriodFilterBar from '../period-filter-bar/PeriodFilterBar';
import { useGetUserAlertRequestsWithPagination } from '@/services/alertRequest.service';
import { customTwMerge } from 'tailwind.config';
import Link from 'next/link';
import ArrowRightIcon from '../../icons/arrow-right-grey.svg';
import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import {
  EventsViewEntity,
  DailyEventsInEventsViewEntity,
} from '@/types/event.type';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
const EmptyView = dynamic(() => import('./EmptyView'));

type HistoryItem =
  | {
      type: 'demand';
      demand: ShuttleDemandsViewEntity;
      event: EventsViewEntity;
      dailyEvent: DailyEventsInEventsViewEntity;
      createdAt: string;
    }
  | {
      type: 'reservation';
      reservation: ReservationsViewEntity;
      event: EventsViewEntity;
      dailyEvent: DailyEventsInEventsViewEntity;
      createdAt: string;
    };

const AllTab = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();

  const { data: demandPages, isLoading: isDemandsLoading } =
    useGetUserDemandsWithPagination({
      monthsAgo: periodFilter === 'ALL' ? undefined : periodFilter,
    });
  const { data: reservations, isLoading: isReservationsLoading } =
    useGetUserReservations({
      monthsAgo: periodFilter === 'ALL' ? undefined : periodFilter,
    });
  const { data: alertRequests, isLoading: isAlertRequestsLoading } =
    useGetUserAlertRequestsWithPagination();

  const isLoading =
    isDemandsLoading || isReservationsLoading || isAlertRequestsLoading;

  const demands = useMemo(
    () => demandPages?.pages?.[0]?.shuttleDemands ?? [],
    [demandPages],
  );

  const mergedItems = useMemo(() => {
    const items: HistoryItem[] = [];

    for (const demand of demands) {
      const event = demand.event;
      const dailyEvent = event.dailyEvents.find(
        (de) => de.dailyEventId === demand.dailyEventId,
      );
      if (event && dailyEvent) {
        items.push({
          type: 'demand',
          demand,
          event,
          dailyEvent,
          createdAt: demand.createdAt,
        });
      }
    }

    if (reservations) {
      for (const reservation of reservations) {
        const event = reservation.shuttleRoute.event;
        const dailyEvent = event.dailyEvents.find(
          (de) => de.dailyEventId === reservation.shuttleRoute.dailyEventId,
        );
        if (event && dailyEvent) {
          items.push({
            type: 'reservation',
            reservation,
            event,
            dailyEvent,
            createdAt: reservation.createdAt,
          });
        }
      }
    }

    items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return items;
  }, [demands, reservations]);

  const isAlertRequestAvailable = useMemo(() => {
    return alertRequests
      ? alertRequests.pages.flatMap((page) => page.shuttleRouteAlertRequests)
          .length > 0
      : false;
  }, [alertRequests]);

  const isReviewWritableReservationsAvailable = useMemo(() => {
    return reservations
      ? reservations.some((reservation) => {
          const isCompletedPayment =
            reservation.reservationStatus === 'COMPLETE_PAYMENT';
          const { isReviewWritingPeriod } =
            checkIsReviewWritingPeriod(reservation);
          const isReviewNotWritten = reservation.reviewId === null;
          return (
            isReviewWritingPeriod && isReviewNotWritten && isCompletedPayment
          );
        })
      : false;
  }, [reservations]);

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
        {demandPages && reservations && alertRequests && (
          <>
            <section
              className={customTwMerge(
                'flex w-full flex-col gap-8 px-16 pb-16',
                !isAlertRequestAvailable &&
                  !isReviewWritableReservationsAvailable &&
                  'hidden',
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
              {isReviewWritableReservationsAvailable && (
                <Link
                  href="/mypage/reviews"
                  className="flex h-48 w-full items-center justify-between rounded-8 border border-basic-blue-200 bg-basic-blue-100 px-16 py-12"
                >
                  <span className="text-14 font-600 text-basic-blue-400">
                    작성할 수 있는 후기가 있어요.
                  </span>
                  <ArrowRightIcon />
                </Link>
              )}
            </section>
            {mergedItems.length === 0 ? (
              <EmptyView />
            ) : (
              <ul className="flex flex-col gap-16 px-16 pb-48">
                {mergedItems.map((item) => {
                  if (item.type === 'demand') {
                    return (
                      <DemandCard
                        key={`demand-${item.demand.shuttleDemandId}`}
                        demand={item.demand}
                        event={item.event}
                        dailyEvent={item.dailyEvent}
                      />
                    );
                  }
                  return (
                    <ReservationCard
                      key={`reservation-${item.reservation.reservationId}`}
                      reservation={item.reservation}
                      event={item.event}
                      dailyEvent={item.dailyEvent}
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

export default AllTab;
