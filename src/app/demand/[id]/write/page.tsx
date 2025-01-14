'use client';

import AppBar from '@/components/app-bar/AppBar';
import WriteForm from './components/WriteForm';
import BannerImage from './components/BannerImage';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetEvent } from '@/services/shuttle-operation.service';

interface Props {
  params: { id: string };
  searchParams: {
    dailyEventId: string;
    regionId: string;
  };
}

const DemandWrite = ({ params, searchParams }: Props) => {
  const { data: event, isLoading } = useGetEvent(Number(params.id));

  return (
    <>
      <AppBar>수요 신청하기</AppBar>
      <DeferredSuspense isLoading={isLoading} fallback={<Loading />}>
        {event && (
          <main className="relative">
            <BannerImage event={event} />
            <WriteForm
              event={event}
              dailyEventId={Number(searchParams.dailyEventId)}
              regionId={Number(searchParams.regionId)}
            />
            <div className="h-120" />
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default DemandWrite;
