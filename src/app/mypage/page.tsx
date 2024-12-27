'use client';

import AppBar from '@/components/app-bar/AppBar';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Settings from './components/Settings';
import { useGetUserDashboard } from '@/services/users';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';

const MyPage = () => {
  const { data: userDashboard, isLoading } = useGetUserDashboard();

  const nickname = userDashboard?.nickname ?? '';
  const profileImage = userDashboard?.profileImage ?? '';
  const reservationCount = userDashboard?.reservations.current.length ?? 0;
  const pastReservationCount = userDashboard?.reservations.past.length ?? 0;
  const shuttleDemandCount = userDashboard?.shuttleDemands.length ?? 0;
  const couponCount = userDashboard?.coupons.length ?? 0;
  const reviewCount = userDashboard?.reservations.hasReview.length ?? 0;

  return (
    <>
      <AppBar>마이페이지</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        <main>
          <Profile nickname={nickname} profileImage={profileImage} />
          <Activity
            reservationCount={reservationCount}
            pastReservationCount={pastReservationCount}
            shuttleDemandCount={shuttleDemandCount}
          />
          <Settings couponCount={couponCount} reviewCount={reviewCount} />
        </main>
      </DeferredSuspense>
    </>
  );
};

export default MyPage;
