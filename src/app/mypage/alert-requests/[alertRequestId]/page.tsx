'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserAlertRequest } from '@/services/alertRequest.service';
import Content from './components/Content';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    alertRequestId: string;
  };
}

const Page = ({ params }: Props) => {
  const { alertRequestId } = params;
  const router = useRouter();
  const {
    data: alertRequest,
    isLoading,
    isSuccess,
  } = useGetUserAlertRequest(alertRequestId);

  if (isSuccess && !alertRequest) {
    router.replace('/mypage/alert-requests');
    return <div className="h-[100dvh]" />;
  }

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {alertRequest && <Content alertRequest={alertRequest} />}
    </DeferredSuspense>
  );
};

export default Page;
