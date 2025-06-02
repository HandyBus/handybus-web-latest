'use client';

import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Header from '@/components/header/Header';
import { useGetUserDemandsWithPagination } from '@/services/demand.service';
import Content from './components/Content';

interface Props {
  params: {
    demandId: string;
  };
}

const Page = ({ params }: Props) => {
  const { demandId } = params;
  const router = useRouter();
  const {
    data: demandPages,
    isLoading,
    isSuccess,
  } = useGetUserDemandsWithPagination();
  const demand = demandPages?.pages[0]?.shuttleDemands.find(
    (demand) => demand.shuttleDemandId === demandId,
  );

  if (isSuccess && !demand) {
    router.replace('/mypage/shuttle?type=demand');
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
