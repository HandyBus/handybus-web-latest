'use client';

import CheckBox from '@/components/buttons/checkbox/CheckBox';
import { useMemo, useState } from 'react';
import Coupon from '@/components/coupon/Coupon';
import NoCoupon from '@/components/coupon/NoCoupon';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserCoupons } from '@/services/coupon.service';

const CouponList = () => {
  const [showUnusableCoupons, setShowUnusableCoupons] = useState(false);
  const { data: coupons, isLoading } = useGetUserCoupons({
    issuedCouponStatus: showUnusableCoupons ? undefined : 'BEFORE_USE',
  });

  const usableCouponsLength = useMemo(
    () => coupons?.filter((coupon) => coupon.status === 'BEFORE_USE').length,
    [coupons],
  );

  return (
    <DeferredSuspense fallback={<Loading style="grow" />} isLoading={isLoading}>
      {coupons && (
        <section className="px-16 py-28">
          <div className="mb-16 flex items-center justify-between font-400 text-basic-grey-500">
            <span>보유한 쿠폰 ({usableCouponsLength})</span>
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
            {!coupons.length ? (
              <NoCoupon />
            ) : (
              coupons.map((coupon) => (
                <Coupon key={coupon.issuedCouponId} coupon={coupon} />
              ))
            )}
          </div>
        </section>
      )}
    </DeferredSuspense>
  );
};

export default CouponList;
