'use client';

import AppBar from '@/components/app-bar/AppBar';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetShuttle } from '@/services/shuttleOperation';
import Form from './components/Form';

interface Props {
  params: {
    id: string; // shuttleId
  };
  searchParams: {
    dailyShuttleId: string;
    shuttleRouteId: string;
  };
}

const Page = ({ params, searchParams }: Props) => {
  const { data: shuttle, isLoading } = useGetShuttle(Number(params.id));

  return (
    <>
      <AppBar>셔틀 예약하기</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {shuttle && (
          <Form
            shuttle={shuttle}
            initialDailyShuttleId={Number(searchParams.dailyShuttleId)}
            initialShuttleRouteId={Number(searchParams.shuttleRouteId)}
          />
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;
