'use client';

import ArticleV1 from '@/components/article/ArticleV1';
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
    <ArticleV1
      richTitle={`예약 가능한 셔틀`}
      titleClassName="text-20"
      showMore="/reservation"
    >
      {isLoading ? (
        <div className="h-408" />
      ) : (
        <div className="h-408">
          <RoutesSwiperView routes={sortedRoutes} />
        </div>
      )}
    </ArticleV1>
  );
};

export default Page;
