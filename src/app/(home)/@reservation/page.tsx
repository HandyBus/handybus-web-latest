'use client';

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
import { toSortedRoutes } from '@/app/reservation/util/sort.util';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { data, isLoading } = useGetRegionAndOpenRoutes();

  const location = data?.promoted ? (
    <p>
      <LocationMarker width="14" height="14" />
      <b>{data?.userRegion ? regionToString(data?.userRegion) : '모든'}</b>{' '}
      지역에 셔틀이 없어{' '}
      <b>{data?.region ? regionToString(data?.region) : '모든'}</b> 지역의
      셔틀을 보여드려요.
    </p>
  ) : (
    <p>
      <LocationMarker width="14" height="14" />
      <b>{data?.region ? regionToString(data?.region) : '모든'}</b> 지역의
      셔틀입니다.
    </p>
  );
  const postfix = toSearchParams({
    bigRegion: data?.region?.bigRegion,
    smallRegion: data?.region?.smallRegion,
  }).toString();

  const sortedRoutes = toSortedRoutes(
    '셔틀 일자 빠른 순',
    data?.routes ?? [],
  ).slice(0, 16);

  return (
    <Bar regionString={location} postfix={postfix} isLoading={isLoading}>
      {isLoading ? (
        <div className="h-408" />
      ) : (
        <RoutesSwiperView routes={sortedRoutes} />
      )}
    </Bar>
  );
};

export default Page;

interface BarProp {
  postfix: string;
  regionString: ReactElement<HTMLParagraphElement>;
  children: ReactNode;
  isLoading: boolean;
}

const Bar = ({ regionString, children, postfix, isLoading }: BarProp) => {
  return (
    <Article
      richTitle={`지금 예약 모집 중인 셔틀`}
      showMore={postfix === '' ? '/reservation' : `/reservation?${postfix}`}
    >
      <div className="flex h-20 flex-row items-center gap-[2px] px-16 text-14 font-500 text-grey-600-sub">
        {!isLoading && (
          <span className="[&>p>b]:font-600 [&>p>b]:text-primary-700 [&>p>svg]:inline [&>p>svg]:text-primary-700">
            {regionString}
          </span>
        )}
      </div>
      {children}
    </Article>
  );
};

const useGetRegionAndOpenRoutes = () => {
  return useQuery({
    queryKey: ['reservation', 'user-region'],
    queryFn: getRegionAndOpenRoutes,
  });
};

// 유저 지역과 관련된 노선을 가져오는 함수
const getRegionAndOpenRoutes = async (): Promise<{
  region: Region | undefined;
  promoted: boolean;
  routes: ShuttleRoute[];
  userRegion: Region | undefined;
}> => {
  let userRegionId: string | null;
  try {
    userRegionId = (await getUser()).regionId;
  } catch {
    userRegionId = null;
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
      region: userRegionId ? ID_TO_REGION[userRegionId] : undefined,
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
