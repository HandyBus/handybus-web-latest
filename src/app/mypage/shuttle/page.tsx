'use client';

import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';
import AllTab from './components/tabs/AllTab';
import ReservationTab from './components/tabs/ReservationTab';
import DemandTab from './components/tabs/DemandTab';

type ShuttleTabType = 'all' | 'reservation' | 'demand';

interface Props {
  searchParams: {
    type: ShuttleTabType;
  };
}

const Shuttle = ({ searchParams }: Props) => {
  const router = useRouter();
  const currentTab: ShuttleTabType = searchParams.type || 'all';

  const renderTab = () => {
    switch (currentTab) {
      case 'all':
        return <AllTab />;
      case 'reservation':
        return <ReservationTab />;
      case 'demand':
        return <DemandTab />;
    }
  };

  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <div className="px-16">
          <Tabs
            items={[
              { label: '전체', value: 'all' },
              { label: '예약', value: 'reservation' },
              { label: '수요조사', value: 'demand' },
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
