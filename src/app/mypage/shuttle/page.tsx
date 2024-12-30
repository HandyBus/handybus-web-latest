'use client';

import AppBar from '@/components/app-bar/AppBar';
import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';
import CurrentTab from './components/tabs/CurrentTab';
import DemandTab from './components/tabs/DemandTab';
import PastTab from './components/tabs/PastTab';
import { useGetUserDashboard } from '@/services/users';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

type TabType = 'current' | 'demand' | 'past';

interface Props {
  searchParams: {
    type: TabType;
  };
}

const Shuttle = ({ searchParams }: Props) => {
  const router = useRouter();
  const { data: userDashboard, isLoading } = useGetUserDashboard();

  const currentTab = searchParams.type || 'current';

  const renderTab = () => {
    switch (currentTab) {
      case 'current':
        return (
          <CurrentTab
            reservations={userDashboard?.reservations.current ?? []}
          />
        );
      case 'demand':
        return <DemandTab demands={userDashboard?.shuttleDemands ?? []} />;
      case 'past':
        return (
          <PastTab reservations={userDashboard?.reservations.past ?? []} />
        );
    }
  };

  return (
    <>
      <AppBar>마이페이지</AppBar>
      <main className="flex grow flex-col">
        <div className="px-16">
          <Tabs
            items={[
              { label: '진행 중인 셔틀', value: 'current' },
              { label: '수요 신청 현황', value: 'demand' },
              { label: '지난 셔틀', value: 'past' },
            ]}
            selected={currentTab}
            onSelect={(value) => {
              router.replace(`/mypage/shuttle?type=${value}`);
            }}
          />
        </div>
        <DeferredSuspense
          fallback={<Loading style="grow" />}
          isLoading={isLoading}
        >
          {renderTab()}
        </DeferredSuspense>
      </main>
    </>
  );
};

export default Shuttle;
