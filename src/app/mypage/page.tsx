'use client';

import AppBar from '@/components/app-bar/AppBar';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Settings from './components/Settings';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserStats } from '@/services/user-management.service';

const MyPage = () => {
  const { data: userStats, isLoading } = useGetUserStats();

  return (
    <>
      <AppBar>마이페이지</AppBar>
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
