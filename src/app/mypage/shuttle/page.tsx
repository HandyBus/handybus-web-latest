'use client';

import AppBar from '@/components/app-bar/AppBar';
import Tabs from '@/components/tab/Tabs';
import { useRouter } from 'next/navigation';
import ShuttleCard from './components/ShuttleCard';

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
          <ShuttleCard
            id={1}
            data={{
              imageSrc:
                'https://image.xportsnews.com/contents/images/upload/article/2024/0724/mb_1721807906980977.jpg',
              title: '민트페스타 vol.74 STIRRING',
              location: 'KT&G 상상마당 라이브홀',
              date: '2024. 08. 25. (일)',
              route: '충청북도 청주시',
              shuttleType: '귀가행',
              passengerCount: 2,
              status: '수요 확인 중',
              reservationDate: '2024. 07. 31. (수)',
              type: '신청',
              price: 10000,
            }}
            buttonText="예약 취소"
          />
          <ShuttleCard
            id={1}
            data={{
              imageSrc:
                'https://image.xportsnews.com/contents/images/upload/article/2024/0724/mb_1721807906980977.jpg',
              title: '민트페스타 vol.74 STIRRING',
              location: 'KT&G 상상마당 라이브홀',
              date: '2024. 08. 25. (일)',
              route: '충청북도 청주시',
              shuttleType: '귀가행',
              passengerCount: 2,
              status: '수요 확인 중',
              reservationDate: '2024. 07. 31. (수)',
              type: '신청',
              price: 10000,
            }}
            buttonText="예약 취소"
          />
        </ul>
      </main>
    </>
  );
};

export default Shuttle;
