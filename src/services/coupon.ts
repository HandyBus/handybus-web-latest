import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authInstance } from './config';
import { toast } from 'react-toastify';
import { CustomError } from './custom-error';
import { IssuedCouponType } from '@/types/client.types';

const getUserCoupons = async () => {
  const res = await authInstance.get<{ issuedCoupons: IssuedCouponType[] }>(
    '/user-management/users/me/coupons',
  );
  return res.issuedCoupons;
};

export const useGetUserCoupons = () => {
  return useQuery({
    queryKey: ['user', 'coupons'],
    queryFn: getUserCoupons,
  });
};

const postCoupon = async (code: string) => {
  return await authInstance.post('/billing/coupons', { code });
};

export const usePostCoupon = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'coupons'] });
      toast.success('쿠폰 등록이 완료되었습니다.');
      onSuccess?.();
    },
    onError: (error: CustomError) => {
      if (error.statusCode === 404) {
        toast.error('쿠폰 코드가 올바르지 않습니다.');
      } else if (error.statusCode === 409) {
        toast.error('이미 등록된 쿠폰입니다.');
      } else if (error.statusCode === 403) {
        toast.error('만료된 쿠폰입니다.');
      } else {
        toast.error('쿠폰 등록에 실패했습니다.');
      }
    },
  });
};
