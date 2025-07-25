import { authInstance } from './config';
import {
  IssuedCouponStatus,
  IssuedCouponsViewEntitySchema,
} from '@/types/coupon.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toSearchParams } from '@/utils/searchParams.util';
import { toast } from 'react-toastify';
import { CustomError } from './custom-error';

// ----- GET -----

export const getUserCoupons = async (params?: {
  status?: IssuedCouponStatus;
  validFrom?: string;
  validTo?: string;
}) => {
  const searchParams = toSearchParams(params);
  const res = await authInstance.get(
    `/v2/user-management/users/me/coupons?${searchParams.toString()}`,
    {
      shape: {
        issuedCoupons: IssuedCouponsViewEntitySchema.array(),
      },
    },
  );
  return res.issuedCoupons;
};

export const useGetUserCoupons = (params?: {
  issuedCouponStatus?: IssuedCouponStatus;
  validFrom?: string;
  validTo?: string;
}) =>
  useQuery({
    queryKey: ['user', 'coupon', params],
    queryFn: () => getUserCoupons(params),
  });

// ----- POST -----

export const postCoupon = async (code: string) => {
  return await authInstance.post('/v1/billing/coupons', { code });
};

export const usePostCoupon = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCoupon,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'coupon'] });
      toast.success('쿠폰이 등록됐어요.');
      onSuccess?.();
    },
    onError: (error: CustomError) => {
      if (error.statusCode === 404) {
        toast.error('쿠폰 코드가 올바르지 않아요.');
      } else if (error.statusCode === 409) {
        toast.error('이미 등록된 쿠폰이에요.');
      } else if (error.statusCode === 400) {
        toast.error('쿠폰이 만료되었어요.');
      } else {
        toast.error('쿠폰을 등록하지 못했어요.');
      }
    },
  });
};
