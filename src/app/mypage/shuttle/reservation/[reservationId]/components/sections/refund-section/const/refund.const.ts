import { ReactNode } from 'react';

export const CANCEL_REASON_OPTIONS = {
  SCHEDULE_CHANGE: '일정이 변경되었어요.',
  PRICE_BURDEN: '가격이 부담돼요.',
  LOCATION_TIME_MISMATCH: '정류장/시간이 맞지 않아요.',
  OTHER_SHUTTLE: '다른 셔틀을 이용하려고요.',
  SIMPLE_CHANGE: '단순 변심',
  OTHER: '기타',
} as const;

export const CANCEL_REASON_DETAIL_OPTIONS = {
  BETTER_TIME: '원하는 시간대에 운행해요.',
  CLOSER_LOCATION: '출발지/도착지가 더 가까워요.',
  LOWER_PRICE: '가격이 더 저렴해요.',
  OTHER: '기타',
} as const;

export const REFUND_STEPS = [
  '취소하시겠어요?',
  '취소 사유를 알려주세요',
  '조금만 더 자세히 알려주시겠어요?',
  '정말 취소하시겠어요?',
] as const;

export const REFUND_STEPS_TO_TEXT: Record<
  (typeof REFUND_STEPS)[number],
  {
    title: ReactNode | ((input: string) => ReactNode);
    description?: ReactNode | ((input: string) => ReactNode);
  }
> = {
  '취소하시겠어요?': {
    title: '취소하시겠어요?',
    description:
      '지금 예약을 취소하시면 서비스 정책에 따라 아래와 같은 취소 수수료가 발생해요.',
  },
  '취소 사유를 알려주세요': {
    title: '취소 사유를 알려주세요',
    description: '사유를 알려주시면 서비스 개선에 도움이 됩니다.',
  },
  '조금만 더 자세히 알려주시겠어요?': {
    title: '조금만 더 자세히 알려주시겠어요?',
    description: '더 나은 핸디버스를 만들도록 노력하겠습니다.',
  },
  '정말 취소하시겠어요?': {
    title: '정말 취소하시겠어요?',
    description:
      '취소하기를 누르면 되돌아갈 수 없어요. 취소 후에는 사용하신 결제 수단으로 수수료를 제외한 금액이 자동 환불됩니다.',
  },
} as const;
