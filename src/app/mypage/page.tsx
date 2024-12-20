import AppBar from '@/components/app-bar/AppBar';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Settings from './components/Settings';
import { getUserDashboard } from '@/services/users';

const MyPage = async () => {
  const userDashboard = await getUserDashboard();

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
      <main>
        <Profile nickname={nickname} profileImage={profileImage} />
        <Activity
          reservationCount={reservationCount}
          pastReservationCount={pastReservationCount}
          shuttleDemandCount={shuttleDemandCount}
        />
        <Settings couponCount={couponCount} reviewCount={reviewCount} />
      </main>
    </>
  );
};

export default MyPage;
