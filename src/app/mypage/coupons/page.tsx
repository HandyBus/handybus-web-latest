'use client';

import AppBar from '@/components/app-bar/AppBar';
import CouponList from './components/CouponList';
import RegisterCoupon from './components/RegisterCoupon';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserCoupons } from '@/services/coupon';

const Coupons = () => {
  const { data: coupons, isLoading } = useGetUserCoupons();

  return (
    <>
      <AppBar>쿠폰함</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {coupons && (
          <main>
            <RegisterCoupon />
            <div className="h-8 bg-grey-50" />
            <CouponList coupons={coupons} />
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default Coupons;
