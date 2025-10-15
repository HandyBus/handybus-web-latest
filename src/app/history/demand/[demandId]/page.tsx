'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Header from '@/components/header/Header';
import { useGetUserDemand } from '@/services/demand.service';
import Content from './components/Content';
import useAppRouter from '@/hooks/useAppRouter';

interface Props {
  params: {
    demandId: string;
  };
}

const Page = ({ params }: Props) => {
  const { demandId } = params;
  const router = useAppRouter();
  const { data: demand, isLoading, isSuccess } = useGetUserDemand(demandId);

  if (isSuccess && !demand) {
    router.replace('/history?type=demand');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {demand && <Content demand={demand} />}
      </DeferredSuspense>
    </>
  );
};

export default Page;
