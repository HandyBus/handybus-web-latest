import type { DemandSortType } from '@/constants/demand';
import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import DemandFilterContainer from './components/DemandFilterContainer';
import { fromString, toDemandSort } from './utils/param.util';
import DemandCard from './components/DemandCard';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { ShuttleWithDemandCountType } from '@/types/shuttle.types';
import { getShuttles } from '@/services/shuttleOperation';
const Empty = dynamic(() => import('./components/Empty'));

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
  const shuttles = await getShuttles('OPEN');

  const sort = fromString(
    (Array.isArray(searchParams?.sort)
      ? searchParams?.sort[0]
      : searchParams?.sort) || '',
  );

  const sortedData = await toSorted(shuttles, toDemandSort(sort));

  return (
    <>
      <AppBar>수요 확인 중인 셔틀</AppBar>
      <div className="flex w-full flex-col items-center">
        <DemandFilterContainer
          length={sortedData.length}
          sort={toDemandSort(sort)}
        >
          {sortedData.length === 0 ? (
            <Empty />
          ) : (
            sortedData?.map((v) => <DemandCard key={v.shuttleId} shuttle={v} />)
          )}
        </DemandFilterContainer>
      </div>
      <Footer />
    </>
  );
};

export default Page;

const toSorted = async (
  shuttles: ShuttleWithDemandCountType[],
  sort: DemandSortType,
) => {
  let newData: ShuttleWithDemandCountType[];
  switch (sort) {
    case '수요 신청한 인원이 많은 순':
      newData = shuttles.toSorted(
        (a, b) => a.totalDemandCount - b.totalDemandCount,
      );
      break;
    case '콘서트 이름 가나다 순':
      newData = shuttles.toSorted((a, b) => a.name.localeCompare(b.name));
      break;
    case '셔틀 일자 빠른 순':
      newData = shuttles.toSorted(
        (a, b) =>
          new Date(a.dailyShuttles[0].date).getTime() -
          new Date(b.dailyShuttles[0].date).getTime(),
      );
      break;
  }
  return newData;
};
