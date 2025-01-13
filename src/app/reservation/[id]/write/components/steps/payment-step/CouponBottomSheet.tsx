import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import Coupon from '@/components/coupon/Coupon';
import NoCoupon from '@/components/coupon/NoCoupon';
import TextInput from '@/components/inputs/text-input/TextInput';
import { RefObject } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUserCoupons } from '@/services/v2-temp/user-management.service';
import { IssuedCoupon } from '@/types/v2-temp/user-management.type';
import { usePostCoupon } from '@/services/v2-temp/billing.service';

interface Props {
  bottomSheetRef: (node: HTMLDivElement) => void;
  contentRef: RefObject<HTMLDivElement> | undefined;
  closeBottomSheet: () => void;
  setSelectedCoupon: (coupon: IssuedCoupon | null) => void;
}

const CouponBottomSheet = ({
  bottomSheetRef,
  contentRef,
  closeBottomSheet,
  setSelectedCoupon,
}: Props) => {
  const { data: coupons } = useGetUserCoupons({
    status: 'BEFORE_USE',
  });

  const { control, handleSubmit, setValue } = useForm<{ coupon: string }>();
  const { mutate: postCoupon } = usePostCoupon({
    onSuccess: () => {
      setValue('coupon', '');
    },
  });
  const onSubmit = (data: { coupon: string }) => {
    postCoupon(data.coupon);
  };

  return (
    <BottomSheet ref={bottomSheetRef} title="쿠폰 선택">
      <div ref={contentRef}>
        <form
          className="flex flex-col gap-24 pb-24 pt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput name="coupon" control={control} setValue={setValue}>
            쿠폰 코드
          </TextInput>
          <Button>쿠폰 등록하기</Button>
        </form>
        <div className="mx-[-32px] h-[8px] bg-grey-50" />
        <section className="py-28">
          <div className="flex flex-col gap-16">
            {!coupons?.length ? (
              <NoCoupon />
            ) : (
              coupons.map((coupon) => (
                <button
                  key={coupon.issuedCouponId}
                  type="button"
                  className="text-left"
                  onClick={() => {
                    setSelectedCoupon(coupon);
                    closeBottomSheet();
                  }}
                >
                  <Coupon coupon={coupon} />
                </button>
              ))
            )}
          </div>
        </section>
      </div>
    </BottomSheet>
  );
};

export default CouponBottomSheet;
