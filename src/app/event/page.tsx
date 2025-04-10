'use client';

import { getEvents } from '@/services/event.service';
// import { Metadata } from 'next';
import { fromString, toDemandSort } from '../demand/utils/param.util';
import { toSorted } from '../demand/utils/toSorted.util';
import Header from '@/components/header/Header';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Empty from '../demand/components/Empty';
import Card from '@/components/card/Card';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import { useRouter } from 'next/navigation';
import FilterBar from './components/FilterBar';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

// export const metadata: Metadata = {
//   title: '행사 리스트',
//   openGraph: {
//     title: '행사 리스트',
//   },
//   twitter: {
//     title: '행사 리스트',
//   },
// };

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = ({ searchParams }: Props) => {
  const router = useRouter();
  const [events, setEvents] = useState<EventsViewEntity[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents('OPEN');
      setEvents(events);
    };
    fetchEvents();
  }, []);

  const [type, setType] = useState<'콘서트' | '지역축제' | '페스티벌'>(
    '콘서트',
  );

  const sort = fromString(
    (Array.isArray(searchParams?.sort)
      ? searchParams?.sort[1]
      : searchParams?.sort) || '',
  );

  const handleSort = (newSort: 'DATE_ASC' | 'NAME_ASC') => {
    router.push(`/event?sort=${newSort}`);
  };

  const sortedEvents = events ? toSorted(events, toDemandSort(sort)) : [];

  return (
    <>
      <Header />
      <FilterBar
        type={type}
        setType={setType}
        sort={sort}
        onSort={handleSort}
      />
      <div className="flex w-full flex-col items-center">
        {sortedEvents.length === 0 ? (
          <Empty />
        ) : (
          sortedEvents.map((event) => (
            <div className="w-full px-[16px] py-[6px]" key={event.eventId}>
              <Card
                key={event.eventId}
                image={event.eventImageUrl}
                variant="SMALL"
                title={event.eventName}
                // href={`/event/${event.eventId}`}
              />
            </div>
          ))
        )}
        <div className="h-[70px]" />
      </div>
      <div className="fixed  bottom-0  left-0  right-0 z-10 mx-auto w-full max-w-500">
        <div className="h-8 w-full bg-basic-grey-50" />
        <a
          className="flex w-full items-center justify-center gap-[10px] bg-basic-white px-[12px] py-[10px] pt-[26px] text-16 font-600 leading-[160%] text-basic-grey-700"
          href={process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL ?? ''}
          target="_blank"
        >
          원하는 행사가 없다면
          <ChevronRightEm className="h-16 w-16 stroke-1 text-basic-grey-700" />
        </a>
      </div>
    </>
  );
};

export default Page;
