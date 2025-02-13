'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Form from './components/Form';
import { useGetEvent } from '@/services/shuttle-operation.service';
import Header from '@/components/header/Header';

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
      <Header />
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
