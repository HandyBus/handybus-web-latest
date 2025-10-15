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

  const redirectToDemandList = () => {
    router.replace('/history?type=demand');
    return <div className="h-[100dvh]" />;
  };

  if (isSuccess) {
    const dailyEvent = demand?.event.dailyEvents.find(
      (dailyEvent) => dailyEvent.dailyEventId === demand?.dailyEventId,
    );
    if (!dailyEvent || !demand) {
      return redirectToDemandList();
    }
    if (demand.status === 'CANCELLED') {
      return redirectToDemandList();
    }
    if (dailyEvent.status === 'ENDED' || dailyEvent.status === 'INACTIVE') {
      return redirectToDemandList();
    }
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
