'use client';

import CouponIcon from 'public/icons/coupon.svg';
import Link from 'next/link';
import Coupon from './Coupon';
import CheckBox from '@/components/buttons/checkbox/CheckBox';
import { useEffect, useMemo, useState } from 'react';
import { IssuedCouponType } from '@/types/client.types';

interface Props {
  coupons: IssuedCouponType[];
}

const CouponList = ({ coupons }: Props) => {
  const [showUnusableCoupons, setShowUnusableCoupons] = useState(false);
  const [filteredCoupons, setFilteredCoupons] = useState(coupons);

  const usableCoupons = useMemo(
    () =>
      coupons
        .filter((coupon) => coupon.status === 'BEFORE_USE')
        .sort(
          (a, b) =>
            new Date(b.validTo).getTime() - new Date(a.validTo).getTime(),
        ),
    [coupons],
  );

  const unusableCoupons = useMemo(
    () =>
      coupons
        .filter(
          (coupon) =>
            coupon.status === 'BEFORE_USE' ||
            coupon.status === 'EXPIRED' ||
            coupon.status === 'RETRIEVED',
        )
        .sort(
          (a, b) =>
            new Date(b.validTo).getTime() - new Date(a.validTo).getTime(),
        ),
    [coupons],
  );

  useEffect(() => {
    if (showUnusableCoupons) {
      setFilteredCoupons(unusableCoupons);
    } else {
      setFilteredCoupons(usableCoupons);
    }
  }, [showUnusableCoupons, usableCoupons, unusableCoupons]);

  return (
    <section className="px-16 py-28">
      <div className="mb-16 flex items-center justify-between font-400 text-grey-500">
        <span>보유한 쿠폰 ({usableCoupons.length})</span>
        <button
          onClick={() => setShowUnusableCoupons((prev) => !prev)}
          className="flex items-center gap-4 text-12"
        >
          <CheckBox
            isChecked={showUnusableCoupons}
            setIsChecked={setShowUnusableCoupons}
          />
          사용 불가능한 쿠폰 포함
        </button>
      </div>
      <div className="flex flex-col gap-16">
        {!filteredCoupons.length ? (
          <NoCoupon />
        ) : (
          filteredCoupons.map((coupon) => (
            <Coupon key={coupon.issuedCouponId} coupon={coupon} />
          ))
        )}
      </div>
    </section>
  );
};

export default CouponList;

const NoCoupon = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-28 ">
      <CouponIcon />
      <span className="text-16 font-400 text-grey-300">쿠폰이 없어요</span>
      <Link
        href="/"
        className="text-14 font-500 text-grey-600-sub underline underline-offset-[3px]"
      >
        진행 중인 이벤트는 홈 화면 배너를 확인해주세요
      </Link>
    </div>
  );
};
