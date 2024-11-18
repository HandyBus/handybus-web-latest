import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import { EventDetailProps } from '@/types/event.types';
import OpenShuttleDetails from './components/OpenShuttleDetails';
import type { DemandSortType } from '@/constants/demand';
import { fromSearchParam, toDemandSortType } from './utils/demand.util';
import { getStatus, getOpenDemandings } from './utils/fetch.util';

const toSorted = async (data: EventDetailProps[], sort: DemandSortType) => {
  let newData: EventDetailProps[];
  switch (sort) {
    case '수요 신청한 인원이 많은 순':
      const stats = new Map(
        (
          await Promise.all(
            data.map(async (e) => ({
              id: e.id,
              number: await getStatus(e),
            })),
          )
        ).map((s) => [s.id, s.number]),
      );
      newData = data.toSorted(
        (a, b) => (stats.get(b.id) || 0) - (stats.get(a.id) || 0),
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

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// TODO should we use cache?
const Page = async ({ searchParams }: Props) => {
  // TODO check this status condition
  const data = await getOpenDemandings();

  const sort = fromSearchParam(
    (Array.isArray(searchParams?.sort)
      ? searchParams?.sort[0]
      : searchParams?.sort) || '',
  );

  const sortedData = await toSorted(data, toDemandSortType(sort));

  return (
    <>
      <AppBar>수요 확인 중인 셔틀</AppBar>
      <div className="flex w-full flex-col items-center">
        <OpenShuttleDetails data={sortedData} sort={toDemandSortType(sort)} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
