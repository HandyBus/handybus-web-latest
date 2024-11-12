'use client';

import AppBar from '@/components/app-bar/AppBar';
import CouponList from './components/CouponList';
import RegisterCoupon from './components/RegisterCoupon';

const Coupons = () => {
  return (
    <>
      <AppBar>쿠폰함</AppBar>
      <main>
        <RegisterCoupon />
        <div className="h-8 bg-grey-50" />
        <CouponList />
      </main>
    </>
  );
};

export default Coupons;
