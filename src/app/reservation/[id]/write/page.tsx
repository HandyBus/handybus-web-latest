'use client';

import AppBar from '@/components/app-bar/AppBar';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Form from './components/Form';
import { useGetEvent } from '@/services/v2-temp/shuttle-operation.service';

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
  const { data: event, isLoading } = useGetEvent(Number(params.id));

  return (
    <>
      <AppBar>셔틀 예약하기</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event && (
          <Form
            event={event}
            initialDailyShuttleId={Number(searchParams.dailyShuttleId)}
            initialShuttleRouteId={Number(searchParams.shuttleRouteId)}
          />
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;
