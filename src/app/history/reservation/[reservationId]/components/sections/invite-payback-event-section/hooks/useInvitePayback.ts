import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { EventsViewEntity } from '@/types/event.type';
import { PaymentsViewEntity } from '@/types/payment.type';
import { ReferralsViewEntity } from '@/types/referral.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { PAYMENT_PARAMS_KEYS } from '@/app/event/[eventId]/dailyevent/[dailyEventId]/route/[shuttleRouteId]/payment/payment.const';
import { useInvitePaybackAnalytics } from './useInvitePaybackAnalytics';

interface UseInvitePaybackProps {
  referral: ReferralsViewEntity | null;
  event: EventsViewEntity;
  reservation: ReservationsViewEntity;
  payment: PaymentsViewEntity;
  passengerCount: number;
}

/**
 * InvitePaybackEventSection 변수 설명
 *
 * - ticketPricePerPerson: 1인당 티켓 가격 (총 결제 금액 / 예매 인원)
 * - maxRefundableAmount: 최대 환급 가능 금액 (개인별 환급 상한, 1인 티켓 가격)
 * - inviteCount: 초대를 수락한 인원 수
 * - calculatedRefundAmount: 누적 환급 예정 금액 (초대 인원 수에 따른 누적 합, [n * (n + 1) / 2] * 1000)
 *     예) 1명: 1000원, 2명: 3000원(1000+2000), 3명: 6000원(1000+2000+3000)
 * - refundAmount: 실제 환급 예정 금액 (최대 환급 금액을 넘지 않도록 제한)
 * - remainingAmount: 남은 환급 가능 금액 (최대 환급 금액 - 현재 환급 예정 금액)
 * - percentage: 달성률 (현재 환급 예정 금액 / 최대 환급 가능 금액 * 100, 최대 100%)
 * - nextInviteScalingDiscount: 다음 초대 시 추가 환급 금액 ((초대 인원 수 + 1) * 1000)
 */
export const useInvitePayback = ({
  referral,
  event,
  reservation,
  payment,
  passengerCount,
}: UseInvitePaybackProps) => {
  const eventId = event.eventId;

  const { trackShareReferralCode } = useInvitePaybackAnalytics({
    event,
    reservation,
  });

  const calculation = useMemo(() => {
    if (!referral) {
      return null;
    }

    const ticketPricePerPerson = Math.floor(
      payment.paymentAmount / passengerCount,
    );
    const maxRefundableAmount = ticketPricePerPerson;
    const inviteCount = referral.usageCount;
    const calculatedRefundAmount =
      ((inviteCount * (inviteCount + 1)) / 2) * 1000;
    const refundAmount = Math.min(calculatedRefundAmount, maxRefundableAmount);
    const remainingAmount = maxRefundableAmount - refundAmount;
    const percentage =
      maxRefundableAmount > 0
        ? Math.min(Math.round((refundAmount / maxRefundableAmount) * 100), 100)
        : 0;
    const nextInviteScalingDiscount = (inviteCount + 1) * 1000;

    return {
      ticketPricePerPerson,
      maxRefundableAmount,
      inviteCount,
      calculatedRefundAmount,
      refundAmount,
      remainingAmount,
      percentage,
      nextInviteScalingDiscount,
    };
  }, [referral, payment.paymentAmount, passengerCount]);

  const handleShareReferralCode = () => {
    if (!referral) {
      return;
    }
    const referralCode = referral.referralCode;
    const referralLink = `${window.location.origin}/open?path=/event/${eventId}?${PAYMENT_PARAMS_KEYS.referralCode}=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('초대 링크가 복사되었습니다.');
    trackShareReferralCode(referralCode);
  };

  return {
    calculation,
    handleShareReferralCode,
  };
};
