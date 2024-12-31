'use client';

import AppBar from '@/components/app-bar/AppBar';
import CouponList from './components/CouponList';
import RegisterCoupon from './components/RegisterCoupon';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUserDashboard } from '@/services/users';
import Loading from '@/components/loading/Loading';

const Coupons = () => {
  const { data: userDashboard, isLoading } = useGetUserDashboard();

  return (
    <>
      <AppBar>쿠폰함</AppBar>
      <main>
        <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
          <RegisterCoupon />
          <div className="h-8 bg-grey-50" />
          <CouponList coupons={userDashboard?.coupons || []} />
        </DeferredSuspense>
      </main>
    </>
  );
};

export default Coupons;
