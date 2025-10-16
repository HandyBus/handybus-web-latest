'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Header from '@/components/header/Header';
import { useGetUserAlertRequest } from '@/services/alertRequest.service';
import Content from './components/Content';
import useAppRouter from '@/hooks/useAppRouter';

interface Props {
  params: {
    alertRequestId: string;
  };
}

const Page = ({ params }: Props) => {
  const { alertRequestId } = params;
  const router = useAppRouter();
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
    <>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {alertRequest && (
          <Content alertRequest={alertRequest} isApp={router.isApp} />
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;
