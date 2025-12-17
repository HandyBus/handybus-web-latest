import { useGetReferral } from '@/services/payment.service';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

interface UseCheckReferralProps {
  eventId: string;
  shuttleRouteId: string;
  referralCode?: string;
}

const useCheckReferral = ({
  eventId,
  shuttleRouteId,
  referralCode,
}: UseCheckReferralProps) => {
  const router = useRouter();

  const { data: referral, isLoading } = useGetReferral(referralCode);

  const isReferralValid = useMemo(() => {
    // referralCode가 없으면 검증 대상이 아니므로 null 반환
    if (!referralCode) return null;
    if (!referral?.isActive) return false;
    return referral?.conditions.every((condition) => {
      if (condition.conditionType === 'EVENT' && condition.eventId !== eventId)
        return false;
      if (
        condition.conditionType === 'SHUTTLE_ROUTE' &&
        condition.shuttleRouteId !== shuttleRouteId
      )
        return false;
      return true;
    });
  }, [referral, eventId, shuttleRouteId, referralCode]);

  useEffect(() => {
    // isReferralValid가 명시적으로 false일 때만 에러 처리
    if (!isLoading && isReferralValid === false) {
      router.replace('/');
      toast.error('초대 링크가 유효하지 않습니다. 다시 시도해주세요.');
    }
  }, [isReferralValid, isLoading, router]);
};

export default useCheckReferral;
