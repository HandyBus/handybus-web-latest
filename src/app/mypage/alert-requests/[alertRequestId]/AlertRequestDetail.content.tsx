'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserAlertRequest } from '@/services/alertRequest.service';
import Content from './components/Content';
import Header from '@/components/header/Header';
import { useFlow } from '@/stacks';
import usePopAll from '@/hooks/usePopAll';

interface Props {
  alertRequestId: string;
}

const AlertRequestDetail = ({ alertRequestId }: Props) => {
  const flow = useFlow();
  const popAll = usePopAll();
  const {
    data: alertRequest,
    isLoading,
    isSuccess,
  } = useGetUserAlertRequest(alertRequestId);

  if (isSuccess && !alertRequest) {
    popAll({ animate: false });
    flow.replace('AlertRequests', {}, { animate: false });
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <Header pageName="빈자리 알림 정보" />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {alertRequest && <Content alertRequest={alertRequest} />}
      </DeferredSuspense>
    </>
  );
};

export default AlertRequestDetail;
