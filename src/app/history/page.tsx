'use client';

import Tabs from '@/components/tab/Tabs';
import NavBar from '@/components/nav-bar/NavBar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import DemandTab from './components/demands/DemandTab';
import ReservationTab from './components/reservations/ReservationTab';
import AllTab from './components/all/AllTab';

type HistoryTabType = 'all' | 'reservation' | 'demand';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get('type');
  const currentTab: HistoryTabType =
    raw === 'reservation' || raw === 'demand' ? raw : 'all';

  const renderTab = () => {
    switch (currentTab) {
      case 'all':
        return <AllTab />;
      case 'demand':
        return <DemandTab />;
      case 'reservation':
        return <ReservationTab />;
    }
  };

  return (
    <>
      <main className="relative flex grow flex-col bg-basic-grey-50">
        <Tabs
          items={[
            { label: '전체', value: 'all' },
            { label: '예약', value: 'reservation' },
            { label: '수요조사', value: 'demand' },
          ]}
          selected={currentTab}
          onSelect={(value) => {
            router.replace(`/history?type=${value}`);
          }}
          className="top-[var(--app-header-offset)]"
        />
        {renderTab()}
      </main>
      <NavBar />
    </>
  );
};

export default Page;
