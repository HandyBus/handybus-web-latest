import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import SubPage from './components/SubPage';
import getFirstSearchParam from '@/utils/getFirstSearchParam';
import {
  shuttleSortSearhParamsFromString,
  searchParamToSort,
} from './constants/params';
import {
  type BigRegionsType,
  REGION_TO_ID,
  type SmallRegionsType,
} from '@/constants/regions';
import { Region } from '@/hooks/useRegion';
import dynamic from 'next/dynamic';
const Empty = dynamic(() => import('./components/Empty'));
import { toSortedRoutes } from './util/sort.util';
import { Metadata } from 'next';
import ShuttleRouteView from './components/ShuttleRoute';
import { getAllRoutes } from '@/services/shuttleOperation';

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
    shuttleSortSearhParamsFromString(
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

  const related = await getAllRoutes({
    status: 'OPEN',
    provinceFullName: region.bigRegion,
    cityFullName: region.smallRegion,
  });

  const data = toSortedRoutes(sortBy, related);

  return (
    <>
      <AppBar>지금 예약 모집 중인 셔틀</AppBar>
      <div className="flex w-full flex-col items-center">
        <SubPage region={region} sort={sortBy} length={data.length}>
          <div>
            {data.length === 0 ? (
              <Empty />
            ) : (
              data.map((v) => (
                <ShuttleRouteView key={v.shuttleRouteId} shuttleRoute={v} />
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
