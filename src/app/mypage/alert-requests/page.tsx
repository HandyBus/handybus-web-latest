'use client';

import Header from '@/components/header/Header';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserAlertRequestsWithPagination } from '@/services/alertRequest.service';
import AlertRequestCard from './components/AlertRequestCard';
import Loading from '@/components/loading/Loading';
import EmptyView from './components/EmptyView';

const Page = () => {
  const { data: alertRequestsPages, isLoading } =
    useGetUserAlertRequestsWithPagination();
  const alertRequests = alertRequestsPages?.pages.flatMap(
    (page) => page.shuttleRouteAlertRequests,
  );

  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <DeferredSuspense
          fallback={<Loading style="grow" />}
          isLoading={isLoading}
        >
          {alertRequests &&
            (alertRequests.length === 0 ? (
              <EmptyView />
            ) : (
              <ul>
                {alertRequests.map((alertRequest) => (
                  <AlertRequestCard
                    key={alertRequest.shuttleRouteAlertRequestId}
                    alertRequest={alertRequest}
                  />
                ))}
              </ul>
            ))}
        </DeferredSuspense>
      </main>
    </>
  );
};

export default Page;
