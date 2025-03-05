'use client';

import WriteForm from './components/WriteForm';
import BannerImage from './components/BannerImage';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetEvent } from '@/services/event.service';
import Header from '@/components/header/Header';

interface Props {
  params: { id: string };
  searchParams: {
    dailyEventId: string;
    regionId: string;
  };
}

const DemandWrite = ({ params, searchParams }: Props) => {
  const { data: event, isLoading } = useGetEvent(params.id);

  return (
    <>
      <Header />
      <DeferredSuspense isLoading={isLoading} fallback={<Loading />}>
        {event && (
          <main className="relative">
            <BannerImage event={event} />
            <WriteForm
              event={event}
              dailyEventId={searchParams.dailyEventId}
              regionId={searchParams.regionId}
            />
            <div className="h-120" />
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default DemandWrite;
