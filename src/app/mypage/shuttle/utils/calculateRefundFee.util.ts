import dayjs, { Dayjs } from 'dayjs';

export const calculateRefundFee = ({
  paymentAmount,
  createdAt,
  dDay,
}: {
  paymentAmount?: number;
  createdAt?: Dayjs;
  dDay?: Dayjs;
}): number | undefined => {
  if (!paymentAmount || !createdAt || !dDay) return undefined;
  console.log('[calculateRefundFee] dDay', dDay);
  let refundableAmount = 0;
  const now = dayjs().startOf('day');
  console.log('[calculateRefundFee] now', now);

  // dDay와 now의 차이를 "일" 단위로 계산 (정수값)
  const daysUntilEvent = dDay.diff(now, 'day');

  // 예약한 당일(24시간 이내)는 전액 환불
  if (now.isBefore(createdAt.add(1, 'day'))) {
    return 0;
  }

  // 각 조건에 따른 환불 금액 계산
  if (daysUntilEvent >= 8) {
    // 이벤트 8일 이상 남은 경우 (D-8 23:59:59 이전): 전액 환불
    refundableAmount = paymentAmount;
  } else if (daysUntilEvent === 7) {
    // 이벤트 7일 남은 경우 (D-7 23:59:59 이전): 25% 수수료 → 75% 환불
    refundableAmount = paymentAmount * 0.75;
  } else if (daysUntilEvent === 6) {
    // 이벤트 6일 남은 경우 (D-6 23:59:59 이전): 50% 수수료 → 50% 환불
    refundableAmount = paymentAmount * 0.5;
  } else {
    // 이벤트 5일 이하인 경우 (D-5 00:00:00 이후): 환불 불가
    refundableAmount = 0;
  }

  return paymentAmount - refundableAmount < 0
    ? undefined
    : paymentAmount - refundableAmount;
};
