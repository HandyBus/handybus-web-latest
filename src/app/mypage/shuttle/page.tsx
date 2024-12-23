'use client';

import AppBar from '@/components/app-bar/AppBar';
import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';
import CurrentTab from './components/tabs/CurrentTab';
import DemandTab from './components/tabs/DemandTab';
import PastTab from './components/tabs/PastTab';
import { useGetUserDashboard } from '@/services/users';
import { MOCK_RESERVATION_DATA } from './[id]/page';

type TabType = 'current' | 'demand' | 'past';

interface Props {
  searchParams: {
    type: TabType;
  };
}

const Shuttle = ({ searchParams }: Props) => {
  const router = useRouter();
  const { data: userDashboard } = useGetUserDashboard();

  const renderTab = () => {
    switch (searchParams.type) {
      case 'current':
        return (
          <CurrentTab
            // reservations={userDashboard?.reservations.current ?? []}
            reservations={[MOCK_RESERVATION_DATA, MOCK_RESERVATION_DATA]}
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
      <main className="grow">
        <div className="px-16">
          <Tabs
            items={[
              { label: '진행 중인 셔틀', value: 'current' },
              { label: '수요 신청 현황', value: 'demand' },
              { label: '지난 셔틀', value: 'past' },
            ]}
            selected={searchParams.type}
            onSelect={(value) => {
              router.replace(`/mypage/shuttle?type=${value}`);
            }}
          />
        </div>
        {renderTab()}
      </main>
    </>
  );
};

export default Shuttle;
