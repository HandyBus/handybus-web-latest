import { useGetReferral } from '@/services/payment.service';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

interface UseCheckReferralProps {
  eventId: string;
  referralCode?: string;
}

const useCheckReferral = ({ eventId, referralCode }: UseCheckReferralProps) => {
  const router = useRouter();

  const { data: referral, isLoading } = useGetReferral(referralCode);

  const isReferralValid = useMemo(() => {
    // referralCode가 없으면 검증 대상이 아니므로 null 반환
    if (!referralCode) return null;

    return (
      referral?.conditions.some(
        (condition) =>
          condition.conditionType === 'EVENT' && condition.eventId === eventId,
      ) ?? false
    );
  }, [referral, eventId, referralCode]);

  useEffect(() => {
    // isReferralValid가 명시적으로 false일 때만 에러 처리
    if (!isLoading && isReferralValid === false) {
      router.replace('/');
      toast.error('초대 링크가 유효하지 않습니다. 다시 시도해주세요.');
    }
  }, [isReferralValid, isLoading, router]);
};

export default useCheckReferral;
