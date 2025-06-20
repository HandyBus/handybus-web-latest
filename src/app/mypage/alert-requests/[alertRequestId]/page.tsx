'use client';

import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Header from '@/components/header/Header';
import { useGetUserAlertRequest } from '@/services/alertRequest.service';
import Content from './Content';

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
  } = useGetUserAlertRequest(alertRequestId); // shuttleRoute가 안온다!!!

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
        {alertRequest && <Content alertRequest={alertRequest} />}
      </DeferredSuspense>
    </>
  );
};

export default Page;
