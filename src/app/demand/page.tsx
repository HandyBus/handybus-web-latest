import DemandFilterContainer from './components/DemandFilterContainer';
import { fromString, toDemandSort } from './utils/param.util';
import DemandCard from './components/DemandCard';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { getEvents } from '@/services/shuttle-operation.service';
const Empty = dynamic(() => import('./components/Empty'));
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Header from '@/components/header/Header';
import { toSorted } from './utils/toSorted.util';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

export const metadata: Metadata = {
  title: '수요 확인 중인 셔틀',
  openGraph: {
    title: '수요 확인 중인 셔틀',
  },
  twitter: {
    title: '수요 확인 중인 셔틀',
  },
};

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const events = await getEvents('OPEN');

  const sort = fromString(
    (Array.isArray(searchParams?.sort)
      ? searchParams?.sort[1]
      : searchParams?.sort) || '',
  );

  const sortedEvents = await toSorted(events, toDemandSort(sort));

  console.log(sort);

  return (
    <>
      <Header />
      <div className="flex w-full flex-col items-center">
        <DemandFilterContainer
          length={sortedEvents.length}
          sort={toDemandSort(sort)}
        >
          {sortedEvents.length === 0 ? (
            <Empty />
          ) : (
            sortedEvents.map((event) => (
              <DemandCard key={event.eventId} event={event} />
            ))
          )}
        </DemandFilterContainer>
      </div>
    </>
  );
};

export default Page;
