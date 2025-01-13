import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import SubPage from './components/SubPage';
import getFirstSearchParam from '@/utils/getFirstSearchParam';
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
import { getShuttleRoutes } from '@/services/v2-temp/shuttle-operation.service';
const Empty = dynamic(() => import('./components/Empty'));

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
      <AppBar>지금 예약 모집 중인 셔틀</AppBar>
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
      <Footer />
    </>
  );
};

export default Page;
