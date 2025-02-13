import SubPage from './components/SubPage';
import {
  shuttleSortSearchParamsFromString,
  searchParamToSort,
} from './constants/params';
import {
  type BigRegionsType,
  REGION_TO_ID,
  type SmallRegionsType,
} from '@/constants/regions';
import { Region } from '@/hooks/useRegion';
import dynamic from 'next/dynamic';
import { toSortedRoutes } from './util/sort.util';
import { Metadata } from 'next';
import ShuttleRouteView from './components/ShuttleRouteView';
import { getShuttleRoutes } from '@/services/shuttle-operation.service';
import getFirstSearchParam from '@/utils/getFirstSearchParam.util';
const Empty = dynamic(() => import('./components/Empty'));
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Header from '@/components/header/Header';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

export const metadata: Metadata = {
  title: '지금 예약 모집 중인 셔틀',
  openGraph: {
    title: '지금 예약 모집 중인 셔틀',
  },
  twitter: {
    title: '지금 예약 모집 중인 셔틀',
  },
};

interface Props {
  searchParams: { [K in string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const sortBy = searchParamToSort(
    shuttleSortSearchParamsFromString(
      getFirstSearchParam(searchParams.sort) || '',
    ),
  );

  const bigRegion = getFirstSearchParam(searchParams.bigRegion) as
    | BigRegionsType
    | undefined;
  const smallRegion =
    bigRegion === undefined
      ? undefined
      : (getFirstSearchParam(searchParams.smallRegion) as
          | SmallRegionsType
          | undefined);

  const region =
    bigRegion && REGION_TO_ID[bigRegion]
      ? ({ bigRegion, smallRegion } as Region)
      : { bigRegion: undefined, smallRegion: undefined };

  const routes = await getShuttleRoutes({
    status: 'OPEN',
    provinceFullName: region.bigRegion,
    cityFullName: region.smallRegion,
  });

  const sortedRoutes = toSortedRoutes(sortBy, routes);

  return (
    <>
      <Header />
      <div className="flex w-full flex-col items-center">
        <SubPage region={region} sort={sortBy} length={sortedRoutes.length}>
          <div>
            {sortedRoutes.length === 0 ? (
              <Empty />
            ) : (
              sortedRoutes.map((route) => (
                <ShuttleRouteView
                  key={route.shuttleRouteId}
                  shuttleRoute={route}
                />
              ))
            )}
          </div>
        </SubPage>
      </div>
    </>
  );
};

export default Page;
