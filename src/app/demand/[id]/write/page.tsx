'use client';

import AppBar from '@/components/app-bar/AppBar';
import WriteForm from './components/WriteForm';
import BannerImage from './components/BannerImage';
import { useGetShuttle } from '@/services/shuttleOperation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

interface Props {
  params: { id: string };
  searchParams: {
    dailyShuttleId: string;
    regionId: string;
  };
}

const DemandWrite = ({ params, searchParams }: Props) => {
  const { data: shuttle, isLoading } = useGetShuttle(Number(params.id));

  return (
    <>
      <AppBar>수요 신청하기</AppBar>
      <DeferredSuspense isLoading={isLoading} fallback={<Loading />}>
        {shuttle && (
          <main className="relative">
            <BannerImage shuttle={shuttle} />
            <WriteForm
              shuttle={shuttle}
              dailyShuttleId={Number(searchParams.dailyShuttleId)}
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
