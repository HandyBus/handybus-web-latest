'use client';

import Tabs from '@/components/tab/Tabs';
import Header from '@/components/header/Header';
import NavBar from '@/components/nav-bar/NavBar';
import useAppRouter from '@/hooks/useAppRouter';
import DemandTab from './components/demands/DemandTab';
import ReservationTab from './components/reservations/ReservationTab';

type HistoryTabType = 'demand' | 'reservation';

interface Props {
  searchParams: {
    type: HistoryTabType;
  };
}

const Page = ({ searchParams }: Props) => {
  const router = useAppRouter();
  const currentTab: HistoryTabType = searchParams.type || 'demand';

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
      <main className="flex grow flex-col bg-basic-grey-50">
        <Tabs
          items={[
            { label: '수요조사', value: 'demand' },
            { label: '예약', value: 'reservation' },
          ]}
          selected={currentTab}
          onSelect={(value) => {
            router.replace(`/history?type=${value}`);
          }}
          className="sticky top-56 z-10"
        />
        {renderTab()}
      </main>
      <NavBar />
    </>
  );
};

export default Page;
