'use client';

import Tabs from '@/components/tab/Tabs';
import NavBar from '@/components/nav-bar/NavBar';
import DemandTab from './components/demands/DemandTab';
import ReservationTab from './components/reservations/ReservationTab';
import Header from '@/components/header/Header';
import { useFlow } from '@/stacks';

type HistoryTabType = 'demand' | 'reservation';

interface Props {
  type: HistoryTabType;
}

const History = ({ type }: Props) => {
  const currentTab: HistoryTabType = type || 'demand';
  const flow = useFlow();
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
          items={
            [
              { label: '수요조사', value: 'demand' },
              { label: '예약', value: 'reservation' },
            ] as const
          }
          selected={currentTab}
          onSelect={(value) => {
            flow.replace('History', { type: value }, { animate: false });
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
