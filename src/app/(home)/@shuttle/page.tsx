import type { ReactElement, ReactNode } from 'react';
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
  const { region, shuttles, promoted, userRegion } =
    await getRegionAndShuttles();

  const location = promoted ? (
    <p>
      <LocationMarker width="14" height="14" />
      <b>{userRegion ? regionToString(userRegion) : '모든'}</b> 지역에 예약 모집
      중인 셔틀이 없어 <b>{region ? regionToString(region) : '모든'}</b> 지역의
      셔틀을 보여드려요.
    </p>
  ) : (
    <p>
      <LocationMarker width="14" height="14" />
      <b>{region ? regionToString(region) : '모든'}</b> 지역의 셔틀입니다.
    </p>
  );
  const postfix = toSearchParams({
    bigRegion: region?.bigRegion,
    smallRegion: region?.smallRegion,
  }).toString();

  return (
    <Bar regionString={location} postfix={postfix}>
      <ShuttlesSwiperView shuttles={shuttles} />
    </Bar>
  );
};

export default Page;

import LocationMarker from './icons/marker.svg';
import { toSearchParams } from '@/utils/searchParams';
interface BarProp {
  postfix: string;
  regionString: ReactElement<HTMLParagraphElement>;
  children: ReactNode;
}

const Bar = ({ regionString, children, postfix }: BarProp) => {
  return (
    <Article
      richTitle={`지금 예약 모집 중인 셔틀`}
      showMore={postfix === '' ? '/shuttle' : `/shuttle?${postfix}`}
    >
      <div className="flex flex-row items-center gap-[2px] px-16 text-14 font-500 text-grey-600-sub">
        <span className="[&>p>b]:font-600 [&>p>b]:text-primary-700 [&>p>svg]:inline [&>p>svg]:text-primary-700">
          {regionString}
        </span>
      </div>
      {children}
    </Article>
  );
};

const getRegionAndShuttles = async (): Promise<{
  region: Region | undefined;
  promoted: boolean;
  shuttles: ShuttleRoute[];
  userRegion: Region | undefined;
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
    return { region: undefined, promoted: false, shuttles, userRegion };
  }

  const regionShuttles = await fetchIncludingRelatedShuttles(userRegion);

  if (regionShuttles.length > 0) {
    return {
      region: ID_TO_REGION[userRegionId],
      promoted: false,
      shuttles: regionShuttles,
      userRegion,
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
      promoted: true,
      shuttles: provinenceShuttles,
      userRegion,
    };
  }

  return { region: undefined, promoted: true, shuttles, userRegion };
};
