'use client';

import AppBar from '@/components/app-bar/AppBar';
import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';

type TabType = 'current' | 'demand' | 'past';

interface Props {
  searchParams: {
    type: TabType;
  };
}

const Shuttle = ({ searchParams }: Props) => {
  const router = useRouter();

  return (
    <>
      <AppBar>마이페이지</AppBar>
      <main className="grow">
        <div className="px-16 py-[10px]">
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
        <ul>
          <ShuttleCard />
        </ul>
      </main>
    </>
  );
};

export default Shuttle;

const ShuttleCard = () => {
  return (
    <li className="flex h-200 flex-col gap-16 bg-grey-300 px-16 py-24">
      MOCK CARD
    </li>
  );
};
