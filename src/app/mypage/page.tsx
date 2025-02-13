'use client';

import Profile from './components/Profile';
import Activity from './components/Activity';
import Settings from './components/Settings';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserStats } from '@/services/user-management.service';
import Header from '@/components/header/Header';

const MyPage = () => {
  const { data: userStats, isLoading } = useGetUserStats();

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {userStats && (
          <main>
            <Profile
              nickname={userStats.nickname}
              profileImage={userStats.profileImage}
            />
            <Activity
              reservationCount={userStats.currentReservationCount}
              pastReservationCount={userStats.pastReservationCount}
              shuttleDemandCount={userStats.shuttleDemandCount}
            />
            <Settings
              couponCount={userStats.activeCouponCount}
              reviewCount={userStats.reviewCount}
            />
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default MyPage;
