'use client';

import Profile from './components/Profile';
import Activity from './components/Activity';
import Settings from './components/Settings';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUser, useGetUserStats } from '@/services/user.service';
import Header from '@/components/header/Header';

const MyPage = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const { data: userStats, isLoading: isLoadingUserStats } = useGetUserStats();
  const isLoading = isLoadingUser || isLoadingUserStats;

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && userStats && (
          <main>
            <Profile
              nickname={user.nickname || ''}
              profileImage={user.profileImage || ''}
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
