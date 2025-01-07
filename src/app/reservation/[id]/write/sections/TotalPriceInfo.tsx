'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import { useFormContext } from 'react-hook-form';
import TextInput from '@/components/inputs/text-input/TextInput';
import Button from '@/components/buttons/button/Button';
import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import { Control } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { RefObject } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';
import EmptyCouponIcon from '/public/icons/empty-coupon.svg';
import DeleteIcon from '/public/icons/x.svg';
import PriceDetail from './PriceDetail';
import { usePostCoupon } from '@/services/coupon';
import { useQuery } from '@tanstack/react-query';
import { authInstance } from '@/services/config';
import { IssuedCouponType } from '@/types/client.types';
import Loading from '@/components/loading/Loading';
import { ShuttleRouteType } from '@/types/shuttle.types';

interface props {
  shuttleData: ShuttleRouteType[];
}

const TotalPriceInfo = ({ shuttleData }: props) => {
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();
  const { control, watch } = useFormContext();
  const coupon = watch('selectedCoupon');
  const watchShuttleRoute = watch('shuttleRoute');
  const currentShuttleData = shuttleData.find(
    (v) => v.shuttleRouteId === watchShuttleRoute?.value,
  );

  const useGetMyCoupons = () => {
    return useQuery({
      queryKey: ['reservationCoupon'],
      queryFn: getMyCoupons,
    });
  };

  const getMyCoupons = async () => {
    const res = await authInstance.get<{ issuedCoupons: IssuedCouponType[] }>(
      '/v1/user-management/users/me/coupons?status=BEFORE_USE',
    );
    return res.issuedCoupons;
  };

  const { data: myCoupons, isLoading } = useGetMyCoupons();
  if (isLoading) return <Loading />;
  if (!currentShuttleData) return;
  return (
    <>
      <section className="flex flex-col gap-[16px] px-16 py-32">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          할인 쿠폰이 있으신가요?
        </h2>
        {coupon ? (
          <SelectedCoupon coupon={coupon} />
        ) : (
          <RedirectButton
            description="핸디버스를 더 합리적으로 만날 수 있어요"
            onClick={openBottomSheet}
          >
            <p>쿠폰 사용하기</p>
          </RedirectButton>
        )}
        <PriceDetail SelectedCoupon={coupon} shuttleData={shuttleData} />
      </section>
      <CouponSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        control={control}
        couponList={myCoupons}
      />
    </>
  );
};

export default TotalPriceInfo;

const CouponSheet = ({
  bottomSheetRef,
  contentRef,
  control,
  couponList,
}: {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement>;
  control: Control<FieldValues, undefined>;
  couponList?: IssuedCouponType[];
}) => {
  const { mutate: postCoupon } = usePostCoupon({
    isReservationInProgress: true,
    onSuccess: () => {
      console.log('✅ onSuccess');
    },
  });
  const { setValue, getValues } = useFormContext();

  return (
    <BottomSheet ref={bottomSheetRef} title="쿠폰 선택">
      <section ref={contentRef}>
        <section className="flex flex-col gap-24 py-28">
          <TextInput
            version="shuttle"
            name="postCoupon"
            setValue={setValue}
            control={control}
            placeholder="쿠폰 코드를 입력해주세요"
          >
            <h3 className="pb-8 text-16 font-500 leading-[25.6px] text-grey-600-sub">
              쿠폰 코드
            </h3>
          </TextInput>
          <Button
            onClick={() => {
              postCoupon(getValues('postCoupon'));
            }}
          >
            쿠폰 등록하기
          </Button>
        </section>
        <div className="mx-[-32px] h-[8px] bg-grey-50" />
        <section className="flex flex-col gap-24 py-28">
          <h3 className="text-14 font-400 leading-[22.4px] text-grey-500 ">{`보유한 쿠폰 (${couponList?.length})`}</h3>
          {couponList && couponList?.length > 0 ? (
            couponList?.map((coupon, index) => (
              <button
                type="button"
                key={index}
                onClick={() => {
                  setValue('selectedCoupon', coupon);
                  console.log('쿠폰선택함,', coupon);
                }}
              >
                <Coupon
                  isSelected={
                    coupon.issuedCouponId ===
                    getValues('selectedCoupon')?.issuedCouponId
                  }
                  key={index}
                  coupon={coupon}
                />
              </button>
            ))
          ) : (
            <EmptyCoupon />
          )}
        </section>
      </section>
    </BottomSheet>
  );
};

const Coupon = ({
  coupon,
  isSelected,
}: {
  coupon: IssuedCouponType;
  isSelected: boolean;
}) => {
  return (
    <button
      type="button"
      className={`flex w-full flex-col gap-4 rounded-[12px] bg-grey-50 p-16 text-left ${
        isSelected && 'bg-grey-100'
      }`}
    >
      <div>
        <p className="text-22 font-600 leading-[35.2px] text-black">
          {coupon.discountType === 'RATE'
            ? `${coupon.discountRate}% 할인`
            : `${coupon.discountAmount}원 할인`}
        </p>
        <p className="text-16 font-500 leading-[25.6px] text-grey-800">
          {coupon.name}
        </p>
      </div>
      <div>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          예약 당 최대 {coupon.maxApplicablePeople}인 적용
        </p>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          {coupon.validTo}까지 사용 가능
        </p>
      </div>
    </button>
  );
};

const SelectedCoupon = ({ coupon }: { coupon: IssuedCouponType }) => {
  const { setValue } = useFormContext();
  return (
    <section className="relative flex flex-col gap-4 rounded-[12px] bg-grey-50 p-16 text-left">
      <div>
        <p className="text-22 font-600 leading-[35.2px] text-black">
          {coupon.discountType === 'RATE'
            ? `${coupon.discountRate}% 할인`
            : `${coupon.discountAmount}원 할인`}
        </p>
        <p className="text-16 font-500 leading-[25.6px] text-grey-800">
          {coupon.name}
        </p>
      </div>
      <div>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          예약 당 최대 {coupon.maxApplicablePeople}인 적용
        </p>
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          {coupon.validTo}까지 사용 가능
        </p>
      </div>
      <button
        type="button"
        className="absolute right-[8px] top-[16px] h-[24px] w-[24px] cursor-pointer hover:opacity-70"
        onClick={() => {
          setValue('selectedCoupon', undefined);
        }}
      >
        <DeleteIcon viewBox="0 0 8 8" width={14} height={14} />
      </button>
    </section>
  );
};

const EmptyCoupon = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-28">
      <EmptyCouponIcon viewBox="0 0 145 144" width={145} height={144} />
      <p className="text-16 font-400 leading-[24px] text-grey-300">
        쿠폰이 없어요
      </p>
    </div>
  );
};
