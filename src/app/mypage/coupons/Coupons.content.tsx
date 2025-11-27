'use client';

import CouponList from './components/CouponList';
import RegisterCoupon from './components/RegisterCoupon';
import Header from '@/components/header/Header';

const Coupons = () => {
  return (
    <>
      <Header pageName="쿠폰" />
      <main className="flex grow flex-col">
        <RegisterCoupon />
        <div className="h-8 bg-basic-grey-50" />
        <CouponList />
      </main>
    </>
  );
};

export default Coupons;
