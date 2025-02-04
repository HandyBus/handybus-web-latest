import type { ReactElement, ReactNode } from 'react';
import Article from '@/components/article/Article';
import { Region } from '@/hooks/useRegion';
import { regionToString } from '@/utils/region.util';
import { ID_TO_REGION } from '@/constants/regions';
import RoutesSwiperView from './components/RoutesSwiperView';
import LocationMarker from './icons/marker.svg';
import { toSearchParams } from '@/utils/searchParams.util';
import { getShuttleRoutes } from '@/services/shuttle-operation.service';
import { ShuttleRoute } from '@/types/shuttle-operation.type';
import { getUser } from '@/services/user-management.service';

const Page = async () => {
  const { region, routes, promoted, userRegion } =
    await getRegionAndOpenRoutes();

  const location = promoted ? (
    <p>
      <LocationMarker width="14" height="14" />
      <b>{userRegion ? regionToString(userRegion) : '모든'}</b> 지역에 셔틀이
      없어 <b>{region ? regionToString(region) : '모든'}</b> 지역의 셔틀을
      보여드려요.
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

  const sortedRoutes = routes
    .sort((a, b) => a.remainingSeatCount - b.remainingSeatCount)
    .slice(0, 16);

  return (
    <Bar regionString={location} postfix={postfix}>
      <RoutesSwiperView routes={sortedRoutes} />
    </Bar>
  );
};

export default Page;

interface BarProp {
  postfix: string;
  regionString: ReactElement<HTMLParagraphElement>;
  children: ReactNode;
}

const Bar = ({ regionString, children, postfix }: BarProp) => {
  return (
    <Article
      richTitle={`지금 예약 모집 중인 셔틀`}
      showMore={postfix === '' ? '/reservation' : `/reservation?${postfix}`}
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

// 유저 지역과 관련된 노선을 가져오는 함수
const getRegionAndOpenRoutes = async (): Promise<{
  region: Region | undefined;
  promoted: boolean;
  routes: ShuttleRoute[];
  userRegion: Region | undefined;
}> => {
  let userRegionId: string | undefined;
  try {
    userRegionId = (await getUser()).regionId;
  } catch {
    userRegionId = undefined;
  }
  const userRegion = userRegionId ? ID_TO_REGION[userRegionId] : undefined;

  if (userRegionId === undefined || userRegion === undefined) {
    const routes = await getShuttleRoutes({ status: 'OPEN' });
    return { region: undefined, promoted: false, routes, userRegion };
  }

  const regionRoutes = await getShuttleRoutes({
    status: 'OPEN',
    provinceFullName: userRegion.bigRegion,
    cityFullName: userRegion.smallRegion,
  });

  if (regionRoutes.length > 0) {
    return {
      region: ID_TO_REGION[userRegionId],
      promoted: false,
      routes: regionRoutes,
      userRegion,
    };
  }

  const promotedRegionRoutes = await getShuttleRoutes({
    status: 'OPEN',
    provinceFullName: userRegion.bigRegion,
  });

  if (promotedRegionRoutes.length > 0) {
    return {
      region: {
        bigRegion: userRegion.bigRegion,
        smallRegion: undefined,
      },
      promoted: true,
      routes: promotedRegionRoutes,
      userRegion,
    };
  }

  const routes = await getShuttleRoutes({ status: 'OPEN' });
  return { region: undefined, promoted: false, routes, userRegion };
};
