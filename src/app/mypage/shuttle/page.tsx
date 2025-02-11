'use client';

import AppBar from '@/components/app-bar/AppBar';
import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';
import CurrentTab from './components/tabs/CurrentTab';
import DemandTab from './components/tabs/DemandTab';
import PastTab from './components/tabs/PastTab';

type TabType = 'current' | 'demand' | 'past';

interface Props {
  searchParams: {
    type: TabType;
  };
}

const Shuttle = ({ searchParams }: Props) => {
  const router = useRouter();
  const currentTab = searchParams.type || 'current';

  const renderTab = () => {
    switch (currentTab) {
      case 'current':
        return <CurrentTab />;
      case 'demand':
        return <DemandTab />;
      case 'past':
        return <PastTab />;
    }
  };

  return (
    <>
      <AppBar>마이페이지</AppBar>
      <main className="flex grow flex-col">
        <div className="px-16">
          <Tabs
            items={[
              { label: '예약 현황', value: 'current' },
              { label: '수요조사 현황', value: 'demand' },
              { label: '지난 예약', value: 'past' },
            ]}
            selected={currentTab}
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
