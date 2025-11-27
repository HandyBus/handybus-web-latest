'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserDemand } from '@/services/demand.service';
import Content from './components/Content';
import Header from '@/components/header/Header';
import { useFlow } from '@/stacks';
import usePopAll from '@/hooks/usePopAll';

interface Props {
  demandId: string;
}

const DemandDetail = ({ demandId }: Props) => {
  const flow = useFlow();
  const popAll = usePopAll();
  const { data: demand, isLoading, isSuccess } = useGetUserDemand(demandId);

  const redirectToDemandList = () => {
    popAll({ animate: false });
    flow.replace('History', { type: 'demand' }, { animate: false });
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
      <Header pageName="수요조사 정보" />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {demand && <Content demand={demand} />}
      </DeferredSuspense>
    </>
  );
};

export default DemandDetail;
