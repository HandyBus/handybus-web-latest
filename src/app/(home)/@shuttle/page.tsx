import type { ReactNode } from 'react';
import { containsRegionID } from '@/app/shuttle/util/contain.util';
import {
  fetchAllShuttles,
  fetchRelatedShuttles,
} from '@/app/shuttle/util/fetch.util';
import { getUser } from '@/services/users';
import Article from '@/components/article/Article';
import { Region } from '@/hooks/useRegion';
import { ID_TO_REGION } from '@/constants/regions';
import { ShuttleRoute } from '@/types/shuttle.types';
import ShuttlesSwiperView from './components/ShuttlesSwiperView';

const Page = async () => {
  const { region, shuttles, related } = await getRegionAndShuttles();

  return (
    <Bar region={region} related={related}>
      <ShuttlesSwiperView shuttles={shuttles} />
    </Bar>
  );
};

export default Page;

import LocationMarker from './icons/marker.svg';
interface BarProp {
  region: Region | undefined;
  children: ReactNode;
  related: boolean;
}

const Bar = ({ region, children, related }: BarProp) => {
  const postfix = region
    ? new URLSearchParams({ ...region } as Record<string, string>).toString()
    : '';

  const location = region
    ? `${region.bigRegion}${region.smallRegion === undefined ? '' : ` ${region.smallRegion}`}`
    : '모든';

  return (
    <Article
      richTitle={`지금 예약 모집 중인 셔틀`}
      showMore={postfix === '' ? '/shuttle' : `/shuttle?${postfix}`}
    >
      <div className="flex flex-row items-center gap-[2px] px-16 text-14 font-500 text-grey-600-sub">
        <span className="text-primary-700">
          <LocationMarker width="14" height="14" />
        </span>
        <span>
          <span className="font-600 text-primary-700">{location}</span>{' '}
          {related ? '인접 ' : ''}
          지역의 셔틀입니다.
        </span>
      </div>
      {children}
    </Article>
  );
};

const getRegionAndShuttles = async (): Promise<{
  region: Region | undefined;
  related: boolean;
  shuttles: ShuttleRoute[];
}> => {
  let userRegionID: number | undefined;
  try {
    userRegionID = (await getUser()).regionId;
  } catch {
    userRegionID = undefined;
  }
  const userRegion = userRegionID ? ID_TO_REGION[userRegionID] : undefined;

  const shuttles = await fetchAllShuttles();

  if (userRegionID === undefined || userRegion === undefined) {
    return { region: undefined, related: false, shuttles };
  }

  const regionShuttles = shuttles.filter((s) =>
    containsRegionID(userRegionID, s),
  );
  if (regionShuttles.length > 0) {
    return {
      region: ID_TO_REGION[userRegionID],
      related: false,
      shuttles: regionShuttles,
    };
  }

  const relatedShuttles = await fetchRelatedShuttles(userRegion);

  if (relatedShuttles.length > 0) {
    return {
      region: ID_TO_REGION[userRegionID],
      related: true,
      shuttles: relatedShuttles,
    };
  }

  return { region: undefined, related: false, shuttles };
};
