'use client';

import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';
import ReservationTab from './components/reservations/ReservationTab';
import DemandTab from './components/demands/DemandTab';

type ShuttleTabType = 'demand' | 'reservation';

interface Props {
  searchParams: {
    type: ShuttleTabType;
  };
}

const Shuttle = ({ searchParams }: Props) => {
  const router = useRouter();
  const currentTab: ShuttleTabType = searchParams.type || 'demand';

  const renderTab = () => {
    switch (currentTab) {
      case 'demand':
        return <DemandTab />;
      case 'reservation':
        return <ReservationTab />;
    }
  };

  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <Tabs
          items={[
            { label: '수요조사', value: 'demand' },
            { label: '예약', value: 'reservation' },
          ]}
          selected={currentTab}
          onSelect={(value) => {
            router.replace(`/mypage/shuttle?type=${value}`);
          }}
        />
        {renderTab()}
      </main>
    </>
  );
};

export default Shuttle;
