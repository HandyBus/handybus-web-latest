'use client';

import AppBar from '@/components/app-bar/AppBar';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Form from './components/Form';
import { useGetEvent } from '@/services/shuttle-operation.service';

interface Props {
  params: {
    id: string; // eventId
  };
  searchParams: {
    dailyEventId: string;
    shuttleRouteId: string;
  };
}

const Page = ({ params, searchParams }: Props) => {
  const { data: event, isLoading } = useGetEvent(params.id);

  return (
    <>
      <AppBar>셔틀 예약하기</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {event && (
          <Form
            event={event}
            initialDailyShuttleId={searchParams.dailyEventId}
            initialShuttleRouteId={searchParams.shuttleRouteId}
          />
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;
