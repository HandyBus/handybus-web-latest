'use client';

import Button from '@/components/buttons/button/Button';
import TextInput from '@/components/inputs/text-input/TextInput';
import { usePostCoupon } from '@/services/coupon.service';
import { useForm } from 'react-hook-form';

const RegisterCoupon = () => {
  const { control, setValue, handleSubmit } = useForm<{ coupon: string }>();
  const { mutate: postCoupon } = usePostCoupon({
    onSuccess: () => {
      setValue('coupon', '');
    },
  });
  const onSubmit = (data: { coupon: string }) => {
    postCoupon(data.coupon);
  };
  return (
    <form
      className="flex flex-col gap-16 px-16 pb-16 pt-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-20 font-700 leading-[140%]">쿠폰</h1>
      <section className="flex items-center gap-16">
        <TextInput name="coupon" control={control} setValue={setValue} />
        <Button size="small">등록</Button>
      </section>
    </form>
  );
};

export default RegisterCoupon;
