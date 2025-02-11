import type { DemandSortType } from '@/constants/demand';
import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import DemandFilterContainer from './components/DemandFilterContainer';
import { fromString, toDemandSort } from './utils/param.util';
import DemandCard from './components/DemandCard';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { getEvents } from '@/services/shuttle-operation.service';
import { Event } from '@/types/shuttle-operation.type';
import { dayjsTz } from '@/utils/dayjsTz.util';
const Empty = dynamic(() => import('./components/Empty'));
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

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
      ? searchParams?.sort[0]
      : searchParams?.sort) || '',
  );

  const sortedEvents = await toSorted(events, toDemandSort(sort));

  return (
    <>
      <AppBar>수요 확인 중인 셔틀</AppBar>
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
      <Footer />
    </>
  );
};

export default Page;

const toSorted = async (events: Event[], sort: DemandSortType) => {
  let newData: Event[];
  switch (sort) {
    // case '수요 신청한 인원이 많은 순':
    //   newData = events.toSorted(
    //     (a, b) => a.totalDemandCount - b.totalDemandCount,
    //   );
    //   break;
    case '콘서트 이름 가나다 순':
      newData = events.toSorted((a, b) =>
        a.eventName.localeCompare(b.eventName),
      );
      break;
    case '셔틀 일자 빠른 순':
      newData = events.toSorted(
        (a, b) =>
          (dayjsTz(a.dailyEvents[0].date).getTime() || 0) -
          (dayjsTz(b.dailyEvents[0].date).getTime() || 0),
      );
      break;
  }
  return newData;
};
