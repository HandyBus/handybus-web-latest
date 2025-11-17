'use client';

import { useGetEvents } from '@/services/event.service';
import { toSorted } from './toSorted.util';
import Empty from './components/Empty';
import Loading from './components/Loading';
import Error from './components/Error';
import Card from '@/components/card/Card';
import ArrowRightIcon from 'public/icons/arrow-right.svg';
import { useMemo, useState } from 'react';
import { EventType } from '@/types/event.type';
import FilterBar from './components/FilterBar';
import { EventSortType } from '@/app/event/event.const';
import { dateString } from '@/utils/dateString.util';
import { checkIsReservationClosingSoon } from './utils/checkIsReservationClosingSoon.util';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { handleExternalLink } from '@/utils/externalLink.util';
import { useFlow } from '@/stacks';

export type EventTypeWithAll = EventType | 'ALL';

const Page = () => {
  const [type, setType] = useState<EventTypeWithAll>('ALL');
  const [sort, setSort] = useState<EventSortType>('DATE_ASC');
  const {
    data: events,
    isLoading,
    error,
  } = useGetEvents({ status: 'OPEN,CLOSED' });

  const filteredEventsByStatus = useMemo(
    () =>
      events?.filter((event) =>
        event.eventStatus === 'CLOSED' && event.eventMinRoutePrice === null
          ? false
          : true,
      ),
    [events],
  );

  const filteredEventsByType = useMemo(() => {
    if (type === 'ALL') {
      return filteredEventsByStatus;
    }
    return filteredEventsByStatus?.filter((event) => event.eventType === type);
  }, [filteredEventsByStatus, type]);

  const sortedEvents = useMemo(
    () =>
      filteredEventsByType && filteredEventsByType.length > 0
        ? toSorted(filteredEventsByType, sort)
        : [],
    [filteredEventsByType, sort],
  );

  const flow = useFlow();
  const handleEventClick = (eventId: string) => {
    flow.push('EventDetail', { eventId });
  };

  return (
    <>
      <main className="relative flex flex-1 flex-col">
        <FilterBar type={type} sort={sort} setType={setType} onSort={setSort} />
        <div className="w-full px-16">
          <DeferredSuspense isLoading={isLoading} fallback={<Loading />}>
            {error ? (
              <Error />
            ) : sortedEvents && sortedEvents.length === 0 ? (
              <Empty />
            ) : (
              <div className="grid grid-cols-2 gap-8">
                {sortedEvents &&
                  sortedEvents.length > 0 &&
                  sortedEvents?.map((event, index) => {
                    const formattedDate = dateString(
                      event.startDate === event.endDate
                        ? event.startDate
                        : [event.startDate, event.endDate],
                      {
                        showWeekday: false,
                      },
                    );

                    const isClosingSoon = checkIsReservationClosingSoon({
                      event,
                    });

                    const isImportant = index < 4;

                    return (
                      <div className="w-full" key={event.eventId}>
                        <Card
                          key={event.eventId}
                          image={event.eventImageUrl}
                          variant="GRID"
                          title={event.eventName}
                          date={formattedDate}
                          location={event.eventLocationName}
                          price={`${event.eventMinRoutePrice?.toLocaleString()}원 ~`}
                          isSaleStarted={event.eventMinRoutePrice !== null}
                          isReservationClosingSoon={isClosingSoon}
                          onClick={() => handleEventClick(event.eventId)}
                          priority={isImportant}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </DeferredSuspense>
        </div>
        {!isLoading && (
          <>
            <div className="mt-[26px] h-8 w-full bg-basic-grey-50" />
            <button
              type="button"
              onClick={() => {
                handleExternalLink(
                  process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL ?? '',
                );
              }}
              className="flex w-full items-center justify-center gap-[10px] bg-basic-white px-[12px] py-[26px] text-16 font-600 leading-[160%] text-basic-grey-700"
            >
              원하는 행사가 없다면
              <ArrowRightIcon />
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Page;
