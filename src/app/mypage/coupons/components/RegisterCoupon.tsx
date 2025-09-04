'use client';

import Button from '@/components/buttons/button/Button';
import TextInput from '@/components/inputs/text-input/TextInput';
import { usePostCoupon } from '@/services/coupon.service';
import { CustomError } from '@/services/custom-error';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

const RegisterCoupon = () => {
  const { control, setValue, handleSubmit } = useForm<{ coupon: string }>();

  const queryClient = useQueryClient();
  const { mutateAsync: postCoupon, isPending } = usePostCoupon();

  const onSubmit = async (data: { coupon: string }) => {
    try {
      await postCoupon(data.coupon);
      await queryClient.invalidateQueries({ queryKey: ['user', 'coupon'] });
      toast.success('쿠폰이 등록됐어요.');
      setValue('coupon', '');
    } catch (e) {
      const error = e as CustomError;
      Sentry.captureException(error, {
        tags: {
          component: 'RegisterCoupon',
          page: 'mypage',
          feature: 'coupon',
          action: 'register-coupon',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          errorStatusCode: error.statusCode,
          errorMessage: error.message,
          couponCode: data.coupon ? 'provided' : 'empty',
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(error);

      if (error.statusCode === 404) {
        toast.error('쿠폰 코드가 올바르지 않아요.');
      } else if (error.statusCode === 409) {
        toast.error('이미 등록된 쿠폰이에요.');
      } else {
        toast.error('쿠폰을 등록하지 못했어요.');
      }
    }
  };
  return (
    <form
      className="flex flex-col gap-16 px-16 pb-16 pt-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-20 font-700 leading-[140%]">쿠폰</h1>
      <section className="flex items-center gap-16">
        <TextInput name="coupon" control={control} setValue={setValue} />
        <Button size="small" disabled={isPending}>
          등록
        </Button>
      </section>
    </form>
  );
};

export default RegisterCoupon;
