import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import { ReservationFormValues } from '../../Form';
import { useFormContext } from 'react-hook-form';
import {
  checkIsEarlybird,
  getSinglePrice,
  getSinglePriceWithEarlybird,
} from '../../../reservation.util';
import useBottomSheet from '@/hooks/useBottomSheet';
import CouponBottomSheet from './CouponBottomSheet';
import { useEffect, useMemo, useState } from 'react';
import Coupon from '@/components/coupon/Coupon';
import XIcon from 'public/icons/x.svg';
import { IssuedCoupon } from '@/types/user-management.type';

const ApplyCoupon = () => {
  const { openBottomSheet, closeBottomSheet, bottomSheetRef, contentRef } =
    useBottomSheet();

  const { getValues, setValue } = useFormContext<ReservationFormValues>();

  const [selectedCoupon, setSelectedCoupon] = useState<IssuedCoupon | null>(
    null,
  );

  const {
    passengersCount,
    isEarlybird,
    singlePrice,
    earlybirdDiscount,
    couponDiscount,
    finalPrice,
  } = useMemo(() => {
    const [shuttleRoute, passengers, type] = getValues([
      'shuttleRoute',
      'passengers',
      'type',
    ]);

    const passengersCount = passengers.length;
    const isEarlybird = checkIsEarlybird(shuttleRoute);
    const singlePrice = getSinglePrice(type, shuttleRoute);

    // 얼리버드 할인
    const singlePriceWithEarlybirdDiscount = isEarlybird
      ? getSinglePriceWithEarlybird(type, shuttleRoute)
      : singlePrice;
    const earlybirdDiscount =
      (singlePrice - singlePriceWithEarlybirdDiscount) * passengersCount;
    const totalPriceWithEarlybirdDiscount =
      singlePriceWithEarlybirdDiscount * passengersCount;

    // 쿠폰 할인
    const cappedPassengersCount = selectedCoupon?.maxApplicablePeople
      ? Math.min(passengersCount, selectedCoupon.maxApplicablePeople)
      : passengersCount;
    const singleCouponDiscount = selectedCoupon
      ? selectedCoupon.discountType === 'RATE'
        ? ((selectedCoupon.discountRate ?? 0) / 100) *
          singlePriceWithEarlybirdDiscount
        : (selectedCoupon.discountAmount ?? 0)
      : 0;
    const couponDiscount = Math.ceil(
      singleCouponDiscount * cappedPassengersCount,
    );
    const cappedCouponDiscount = selectedCoupon?.maxDiscountAmount
      ? Math.min(
          couponDiscount,
          selectedCoupon.maxDiscountAmount,
          totalPriceWithEarlybirdDiscount,
        )
      : Math.min(couponDiscount, totalPriceWithEarlybirdDiscount);

    // 최종 결제 금액
    const finalPrice = Math.max(
      Math.floor(totalPriceWithEarlybirdDiscount - cappedCouponDiscount),
      0,
    );

    setValue('finalPrice', finalPrice);

    return {
      passengersCount,
      isEarlybird,
      singlePrice,
      earlybirdDiscount,
      couponDiscount: cappedCouponDiscount,
      finalPrice,
    };
  }, [selectedCoupon?.issuedCouponId]);

  useEffect(() => {
    if (!selectedCoupon) {
      setValue('issuedCouponId', undefined);
    } else {
      setValue('issuedCouponId', selectedCoupon.issuedCouponId);
    }
  }, [selectedCoupon?.issuedCouponId]);

  return (
    <>
      <section className="flex flex-col gap-16 py-28">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          할인 쿠폰이 있으신가요?
        </h2>
        {selectedCoupon ? (
          <div className="relative">
            <Coupon coupon={selectedCoupon} />
            <button
              type="button"
              className="absolute right-16 top-16"
              onClick={() => {
                setSelectedCoupon(null);
              }}
            >
              <XIcon color="#5A5A5A" width={12} height={12} viewBox="0 0 8 8" />
            </button>
          </div>
        ) : (
          <RedirectButton
            description="핸디버스를 더 합리적으로 만날 수 있어요"
            onClick={openBottomSheet}
          >
            <p>쿠폰 사용하기</p>
          </RedirectButton>
        )}
        <article className="py-24">
          <dl className="flex flex-col gap-16">
            {/* 일반 금액 */}
            <div className="flex h-[42px] flex-row justify-between">
              <dt className="text-16 font-400 leading-[24px] text-grey-900">
                예약금액
              </dt>
              <div>
                <dd className="text-right text-16 font-400 leading-[24px] text-grey-900">
                  {(singlePrice * passengersCount).toLocaleString()} 원
                </dd>
                <dd className="text-right text-12 font-400 leading-[19.2px] text-grey-600">
                  {singlePrice.toLocaleString()} 원 * {passengersCount}인
                </dd>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <dt className="text-16 font-400 leading-[24px] text-grey-900">
                할인금액
              </dt>
              <div>
                {isEarlybird && (
                  <>
                    {/* 얼리버드 할인 금액 */}
                    <dd className="text-right text-16 font-400 leading-[22px] text-grey-900">
                      - {earlybirdDiscount.toLocaleString()} 원
                    </dd>
                    <dd className="pb-4 text-right text-12 font-400 leading-[19px] text-grey-600">
                      얼리버드 할인
                    </dd>
                  </>
                )}
                {/* 쿠폰 할인 금액 */}
                {selectedCoupon && (
                  <>
                    <dd className="text-right text-16 font-400 leading-[22px] text-grey-900">
                      - {couponDiscount.toLocaleString()} 원
                    </dd>
                    <dd className="text-right text-12 font-400 leading-[19px] text-grey-600">
                      쿠폰 할인
                    </dd>
                  </>
                )}
              </div>
            </div>
            <div className="flex h-[42px] flex-row justify-between">
              <dt className="text-18 font-500 leading-[28.8px] text-grey-900">
                최종 결제 금액
              </dt>
              <dd className="text-22 font-600 leading-[35.2px] text-grey-900">
                {finalPrice.toLocaleString()} 원
              </dd>
            </div>
          </dl>
        </article>
      </section>
      <CouponBottomSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        closeBottomSheet={closeBottomSheet}
        setSelectedCoupon={setSelectedCoupon}
      />
    </>
  );
};

export default ApplyCoupon;
