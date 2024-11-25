import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import SubPage from './components/SubPage';
import { fetchAllShuttles, fetchRelatedShuttles } from './util/fetch.util';
import singleSearchParam from '@/utils/singleSearchParam';
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
import ShuttleRouteView from './components/ShuttleRoute';
import { toSortedShuttles } from './util/sort.util';

interface Props {
  searchParams: { [K in string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const sortBy = searchParamToSort(
    shuttleSortSearhParamsFromString(
      singleSearchParam(searchParams.sort) || '',
    ),
  );

  const bigRegion = singleSearchParam(searchParams.bigRegion) as
    | BigRegionsType
    | undefined;
  const smallRegion =
    bigRegion === undefined
      ? undefined
      : (singleSearchParam(searchParams.smallRegion) as
          | SmallRegionsType
          | undefined);

  const region =
    bigRegion && REGION_TO_ID[bigRegion]
      ? ({ bigRegion, smallRegion } as Region)
      : { bigRegion: undefined, smallRegion: undefined };

  console.log('region', region);

  const [shuttles, related] = await Promise.all([
    fetchAllShuttles(),
    fetchRelatedShuttles(region),
  ]);

  const data = toSortedShuttles(region, sortBy, shuttles);

  return (
    <>
      <AppBar>지금 예약 모집 중인 셔틀</AppBar>
      <div className="flex w-full flex-col items-center">
        <SubPage
          region={region}
          sort={sortBy}
          serverlist={
            data.length > 0 || !related || related.length === 0 ? (
              <>
                <span className="text-14 font-500 text-grey-500">
                  {region.bigRegion === undefined ? '전국' : region.bigRegion}
                  {region.smallRegion ? ` ${region.smallRegion}` : ''}
                </span>
                <span className="text-14 font-400 text-grey-500">
                  에서 예약 모집 중인 셔틀({data.length})
                </span>
              </>
            ) : (
              <>
                <span className="text-14 font-500 text-grey-500">
                  {region.bigRegion === undefined
                    ? '전국'
                    : String(region.bigRegion)}
                  {region.smallRegion ? ` ${region.smallRegion}` : ''}
                </span>
                <span className="text-14 font-400 text-grey-500">
                  에서 예약 모집 중인 셔틀이 없어{' '}
                  <span className="text-14 font-600 text-grey-500">
                    {relatedRegionNames(region, related)}
                  </span>
                  의 결과를 대신 보여드려요.
                </span>
              </>
            )
          }
        >
          <div>
            {data.length === 0 ? (
              related.length === 0 ? (
                <Empty />
              ) : (
                related.map((v) => (
                  <ShuttleRouteView key={v.shuttleRouteID} shuttleRoute={v} />
                ))
              )
            ) : (
              data.map((v) => (
                <ShuttleRouteView key={v.shuttleRouteID} shuttleRoute={v} />
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

import { ID_TO_REGION } from '@/constants/regions';
import type { ShuttleRoute } from '@/types/shuttle.types';

const relatedRegionNames = (
  region: Region,
  relatedShuttles: ShuttleRoute[],
) => {
  const regionIDs = relatedShuttles.flatMap((s) =>
    s.hubs.dropoff
      .map((d) => d.regionID)
      .concat(s.hubs.pickup.map((p) => p.regionID)),
  );

  const uniqueRegionIDs = Array.from(new Set(regionIDs));

  const regionNames = uniqueRegionIDs.map((id) => ID_TO_REGION[id].smallRegion);
  const rest = regionNames.length - 2;

  if (rest > 0) {
    return `${regionNames.slice(0, 2).join(', ')} 외 ${rest}개`;
  }
  return regionNames.slice(0, 2).join(', ');
};
