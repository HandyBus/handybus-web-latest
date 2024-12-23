import AppBar from '@/components/app-bar/AppBar';
import Footer from '@/components/footer/Footer';
import SubPage from './components/SubPage';
import { fetchAllShuttles, fetchRelatedShuttles } from './util/fetch.util';
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
import ShuttleRouteView from './components/ShuttleRoute';
import { toSortedShuttles } from './util/sort.util';

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
          header={
            data.length > 0 || !related || related.length === 0
              ? {
                  type: 'REGION',
                  length: data.length,
                }
              : {
                  type: 'RELATED',
                  length: related.length,
                  related: relatedRegionNames(region, related),
                }
          }
        >
          <div>
            {data.length === 0 ? (
              related.length === 0 ? (
                <Empty />
              ) : (
                related.map((v) => (
                  <ShuttleRouteView key={v.shuttleRouteId} shuttleRoute={v} />
                ))
              )
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

import { ID_TO_REGION } from '@/constants/regions';
import type { ShuttleRoute } from '@/types/shuttle.types';

const relatedRegionNames = (
  region: Region,
  relatedShuttles: ShuttleRoute[],
) => {
  const regionIds = relatedShuttles.flatMap((s) =>
    s.hubs.dropoff
      .map((d) => d.regionId)
      .concat(s.hubs.pickup.map((p) => p.regionId)),
  );

  const uniqueRegionIds = Array.from(new Set(regionIds));

  const regionNames = uniqueRegionIds.map((id) => ID_TO_REGION[id].smallRegion);
  const rest = regionNames.length - 2;

  if (rest > 0) {
    return `${regionNames.slice(0, 2).join(', ')} 외 ${rest}개`;
  }
  return regionNames.slice(0, 2).join(', ');
};
