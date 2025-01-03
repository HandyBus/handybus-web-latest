import type { ReactNode } from 'react';
import {
  fetchAllShuttles,
  fetchIncludingRelatedShuttles,
} from '@/app/shuttle/util/fetch.util';
import { getUser } from '@/services/users';
import Article from '@/components/article/Article';
import { Region } from '@/hooks/useRegion';
import { regionToString } from '@/utils/region.util';
import { ID_TO_REGION } from '@/constants/regions';
import { ShuttleRoute } from '@/types/shuttle.types';
import ShuttlesSwiperView from './components/ShuttlesSwiperView';

const Page = async () => {
  const { region, shuttles, related } = await getRegionAndShuttles();

  const location = region ? regionToString(region) : '모든';

  const postfix = toSearchParams({
    bigRegion: region?.bigRegion,
    smallRegion: region?.smallRegion,
  }).toString();

  return (
    <Bar regionString={location} related={related} postfix={postfix}>
      <ShuttlesSwiperView shuttles={shuttles} />
    </Bar>
  );
};

export default Page;

import LocationMarker from './icons/marker.svg';
import { toSearchParams } from '@/utils/searchParams';
interface BarProp {
  postfix: string;
  regionString: string;
  children: ReactNode;
  related: boolean;
}

const Bar = ({ regionString, children, related, postfix }: BarProp) => {
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
          <span className="font-600 text-primary-700">{regionString}</span>{' '}
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
  let userRegionId: number | undefined;
  try {
    userRegionId = (await getUser()).regionId;
  } catch {
    userRegionId = undefined;
  }
  const userRegion = userRegionId ? ID_TO_REGION[userRegionId] : undefined;

  const shuttles = await fetchAllShuttles();

  if (userRegionId === undefined || userRegion === undefined) {
    return { region: undefined, related: false, shuttles };
  }

  const regionShuttles = await fetchIncludingRelatedShuttles(userRegion);

  if (regionShuttles.length > 0) {
    return {
      region: ID_TO_REGION[userRegionId],
      related: false,
      shuttles: regionShuttles,
    };
  }

  const provinenceShuttles = await fetchIncludingRelatedShuttles({
    bigRegion: userRegion.bigRegion,
    smallRegion: undefined,
  });

  if (provinenceShuttles.length > 0) {
    return {
      region: {
        bigRegion: userRegion.bigRegion,
        smallRegion: undefined,
      },
      related: true,
      shuttles: provinenceShuttles,
    };
  }

  return { region: undefined, related: false, shuttles };
};
