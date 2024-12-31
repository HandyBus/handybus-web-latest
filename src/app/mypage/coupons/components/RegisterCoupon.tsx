'use client';

import Button from '@/components/buttons/button/Button';
import TextInput from '@/components/inputs/text-input/TextInput';
import { usePostCoupon } from '@/services/coupon';
import { useForm } from 'react-hook-form';

const RegisterCoupon = () => {
  const { control, setValue, handleSubmit } = useForm<{ coupon: string }>();
  const { mutate: postCoupon } = usePostCoupon();
  const onSubmit = (data: { coupon: string }) => {
    postCoupon(data.coupon);
  };
  return (
    <form
      className="flex flex-col gap-24 px-16 py-28"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput name="coupon" control={control} setValue={setValue}>
        쿠폰 코드
      </TextInput>
      <Button>쿠폰 등록하기</Button>
    </form>
  );
};

export default RegisterCoupon;
