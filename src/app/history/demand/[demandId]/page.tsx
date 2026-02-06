'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserDemand } from '@/services/demand.service';
import Content from './components/Content';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    demandId: string;
  };
}

const Page = ({ params }: Props) => {
  const { demandId } = params;
  const router = useRouter();
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
    if (
      dailyEvent.dailyEventStatus === 'ENDED' ||
      dailyEvent.dailyEventStatus === 'INACTIVE'
    ) {
      return redirectToDemandList();
    }
  }

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {demand && <Content demand={demand} />}
    </DeferredSuspense>
  );
};

export default Page;
