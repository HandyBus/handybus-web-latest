'use client';

import Button from '@/components/buttons/button/Button';
import TextInput from '@/components/inputs/text-input/TextInput';
import { useForm } from 'react-hook-form';

const RegisterCoupon = () => {
  const { control, setValue } = useForm<{ coupon: string }>();
  return (
    <section className="flex flex-col gap-4 px-16 py-28">
      <TextInput name="coupon" control={control} setValue={setValue}>
        쿠폰 코드
      </TextInput>
      <Button>쿠폰 등록하기</Button>
    </section>
  );
};

export default RegisterCoupon;
