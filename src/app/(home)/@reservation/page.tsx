'use client';

import Article from '@/components/article/Article';
import RoutesSwiperView from './components/RoutesSwiperView';
import { toSortedRoutes } from '@/app/reservation/util/sort.util';
import { useGetShuttleRoutes } from '@/services/shuttleRoute.service';

const Page = () => {
  const { data, isLoading } = useGetShuttleRoutes({
    status: 'OPEN',
  });

  const sortedRoutes = toSortedRoutes('셔틀 일자 빠른 순', data ?? []).slice(
    0,
    16,
  );

  return (
    <Article richTitle={`예약 가능한 셔틀`} showMore="/reservation">
      {isLoading ? (
        <div className="h-408" />
      ) : (
        <div className="h-408">
          <RoutesSwiperView routes={sortedRoutes} />
        </div>
      )}
    </Article>
  );
};

export default Page;
