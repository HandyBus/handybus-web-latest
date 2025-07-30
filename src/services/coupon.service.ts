import { authInstance } from './config';
import {
  IssuedCouponStatus,
  IssuedCouponsViewEntitySchema,
} from '@/types/coupon.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toSearchParams } from '@/utils/searchParams.util';

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

export const usePostCoupon = () => {
  return useMutation({
    mutationFn: postCoupon,
  });
};
