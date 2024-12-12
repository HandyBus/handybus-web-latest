import type { DemandSortType } from '@/constants/demand';
import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import { EventDetailProps } from '@/types/event.types';
import OpenShuttleDetails from './components/OpenShuttleDetails';
import { fromString, toDemandSort } from './utils/param.util';
import { getOpenDemandings } from './utils/fetch.util';
import ShuttleDetail from './components/ShuttleDetail';
import dynamic from 'next/dynamic';
const Empty = dynamic(() => import('./components/Empty'));

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const data = await getOpenDemandings();

  const sort = fromString(
    (Array.isArray(searchParams?.sort)
      ? searchParams?.sort[0]
      : searchParams?.sort) || '',
  );

  const sortedData = await toSorted(data, toDemandSort(sort));

  return (
    <>
      <AppBar>수요 확인 중인 셔틀</AppBar>
      <div className="flex w-full flex-col items-center">
        <OpenShuttleDetails
          length={sortedData.length}
          sort={toDemandSort(sort)}
        >
          {sortedData.length === 0 ? (
            <Empty />
          ) : (
            sortedData?.map((v) => (
              <ShuttleDetail key={v.shuttleID} shuttle={v} />
            ))
          )}
        </OpenShuttleDetails>
      </div>
      <Footer />
    </>
  );
};

export default Page;

const toSorted = async (data: EventDetailProps[], sort: DemandSortType) => {
  let newData: EventDetailProps[];
  switch (sort) {
    case '수요 신청한 인원이 많은 순':
      newData = data.toSorted(
        (a, b) => a.totalDemandCount - b.totalDemandCount,
      );
      break;
    case '콘서트 이름 가나다 순':
      newData = data.toSorted((a, b) => a.name.localeCompare(b.name));
      break;
    case '셔틀 일자 빠른 순':
      newData = data.toSorted(
        (a, b) =>
          new Date(a.dailyShuttles[0].date).getTime() -
          new Date(b.dailyShuttles[0].date).getTime(),
      );
      break;
  }
  return newData;
};
