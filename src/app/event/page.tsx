'use client';

import { useGetEvents } from '@/services/event.service';
import { toSorted } from './toSorted.util';
import Header from '@/components/header/Header';
import Empty from './components/Empty';
import Loading from './components/Loading';
import Error from './components/Error';
import Card from '@/components/card/Card';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import { useMemo, useState } from 'react';
import { EventType } from '@/types/event.type';
import FilterBar from './components/FilterBar';
import { EventSortType } from '@/app/event/event.const';
import { dateString } from '@/utils/dateString.util';

const Page = () => {
  const [type, setType] = useState<EventType>('CONCERT');
  const [sort, setSort] = useState<EventSortType>('DATE_ASC');
  const {
    data: events,
    isLoading,
    error,
  } = useGetEvents({ status: 'OPEN,CLOSED' });

  const filteredEvents = useMemo(
    () => events?.filter((event) => event.eventType === type),
    [events, type],
  );

  const sortedEvents = useMemo(
    () =>
      filteredEvents && filteredEvents.length > 0
        ? toSorted(filteredEvents, sort)
        : [],
    [filteredEvents, sort],
  );

  return (
    <>
      <Header />
      <FilterBar type={type} sort={sort} setType={setType} onSort={setSort} />
      <div className="flex w-full flex-col items-center">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : sortedEvents?.length === 0 ? (
          <Empty />
        ) : (
          sortedEvents &&
          sortedEvents.length > 0 &&
          sortedEvents?.map((event) => (
            <div className="w-full px-[16px] py-[6px]" key={event.eventId}>
              <Card
                key={event.eventId}
                image={event.eventImageUrl}
                variant="SMALL"
                title={event.eventName}
                date={dateString([event.startDate, event.endDate], {
                  showWeekday: false,
                })}
                location={event.eventLocationName}
                price={`${event.minRoutePrice?.toLocaleString()}원 ~`}
                isSaleStarted={event.hasOpenRoute}
                href={`/event/${event.eventId}`}
              />
            </div>
          ))
        )}
        {!isLoading && (
          <>
            <div className="mt-[26px] h-8 w-full bg-basic-grey-50" />
            <a
              className="flex w-full items-center justify-center gap-[10px] bg-basic-white px-[12px] py-[26px] text-16 font-600 leading-[160%] text-basic-grey-700"
              href={process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL ?? ''}
              target="_blank"
            >
              원하는 행사가 없다면
              <ChevronRightEm className="h-16 w-16 stroke-1 text-basic-grey-700" />
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
