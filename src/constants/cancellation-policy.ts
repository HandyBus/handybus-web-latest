export interface CancellationPolicyRow {
  timing: string;
  fee: string;
  highlight?: boolean;
}

export const SHUTTLE_BUS_CANCELLATION_POLICY_DATA: CancellationPolicyRow[] = [
  { timing: '예약 2시간 이내', fee: '수수료 없음', highlight: true },
  { timing: '~탑승 8일 전 23:59', fee: '수수료 없음' },
  { timing: '~탑승 7일 전 23:59', fee: '결제 금액의 25%' },
  { timing: '~탑승 6일 전 23:59', fee: '결제 금액의 50%' },
  { timing: '탑승 5일 전 00:00~', fee: '환불 불가' },
];

export const HANDY_PARTY_CANCELLATION_POLICY_DATA: CancellationPolicyRow[] = [
  { timing: '예약 2시간 이내', fee: '수수료 없음', highlight: true },
  { timing: '~탑승 6일 전 23:59', fee: '수수료 없음' },
  { timing: '탑승 5일 전 00:00~', fee: '환불 불가' },
];
