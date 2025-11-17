'use client';

import Tabs from '@/components/tab/Tabs';
import NavBar from '@/components/nav-bar/NavBar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import DemandTab from './components/demands/DemandTab';
import ReservationTab from './components/reservations/ReservationTab';
import Header from '@/components/header/Header';

type HistoryTabType = 'demand' | 'reservation';

const History = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab: HistoryTabType =
    (searchParams.get('type') as HistoryTabType) || 'demand';

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
      <main className="relative flex grow flex-col bg-basic-grey-50">
        <Tabs
          items={[
            { label: '수요조사', value: 'demand' },
            { label: '예약', value: 'reservation' },
          ]}
          selected={currentTab}
          onSelect={(value) => {
            router.replace(`/history?type=${value}`);
          }}
          className="top-56"
        />
        {renderTab()}
      </main>
      <NavBar />
    </>
  );
};

export default History;
