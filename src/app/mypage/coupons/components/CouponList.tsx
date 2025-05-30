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
  const { data, isLoading } = useGetUserCoupons({
    issuedCouponStatus: showUnusableCoupons ? undefined : 'BEFORE_USE',
  });

  const usableCouponsLength = useMemo(
    () => data?.filter((coupon) => coupon.status === 'BEFORE_USE').length,
    [data],
  );

  const coupons = useMemo(() => {
    if (showUnusableCoupons)
      return data?.filter(
        (coupon) => coupon.status !== 'USED' && coupon.status !== 'DELETED',
      );
    return data;
  }, [data]);

  return (
    <section className="p-16">
      <div className="mb-16 flex items-center justify-between font-400 leading-[160%]">
        <span className="font-00 text-16 text-basic-black">
          쿠폰 {usableCouponsLength ?? 0}개
        </span>
        <button
          onClick={() => setShowUnusableCoupons((prev) => !prev)}
          className="flex items-center gap-4 text-14 font-600 text-basic-grey-700"
        >
          <CheckBox
            isChecked={showUnusableCoupons}
            setIsChecked={setShowUnusableCoupons}
          />
          만료 쿠폰 포함
        </button>
      </div>
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {coupons && (
          <div className="flex flex-col gap-16">
            {!coupons.length ? (
              <NoCoupon />
            ) : (
              coupons.map((coupon) => (
                <Coupon key={coupon.issuedCouponId} coupon={coupon} />
              ))
            )}
          </div>
        )}
      </DeferredSuspense>
    </section>
  );
};

export default CouponList;
