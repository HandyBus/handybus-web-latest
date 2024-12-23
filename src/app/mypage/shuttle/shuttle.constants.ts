export type StatusType =
  | '수요 확인 중'
  | '수요 신청 마감'
  | '예약 모집 중'
  | '예약 모집 마감'
  | '배차 확정'
  | '운행 종료'
  | '무산'
  | '비활성';

export const STATUS_STYLE = {
  fullGreen: {
    dot: 'bg-primary-main',
    text: 'text-primary-main',
  },
  emptyGreen: {
    dot: 'border-2 border-primary-main',
    text: 'text-primary-main',
  },
  darkGrey: {
    dot: 'bg-grey-700',
    text: 'text-grey-700',
  },
  lightGrey: {
    dot: 'bg-grey-500',
    text: 'text-grey-500',
  },
};

export const RESERVATION_STATUS_TEXT = {
  OPEN: '예약 모집 중',
  CLOSED: '예약 모집 마감',
  CONFIRMED: '배차 확정',
  ENDED: '운행 종료',
  CANCELLED: '무산',
  INACTIVE: '비활성',
} as const;

export const DEMAND_STATUS_TEXT = {
  OPEN: '수요 확인 중',
  CLOSED: '수요 신청 마감',
  SHUTTLE_ASSIGNED: '수요 신청 마감',
  ENDED: '운행 종료',
  CANCELLED: '무산',
  INACTIVE: '비활성',
} as const;

export const TRIP_TEXT = {
  TO_DESTINATION: '콘서트행',
  FROM_DESTINATION: '귀가행',
  ROUND_TRIP: '왕복',
} as const;

export const HANDY_STATUS_TEXT = {
  SUPPORTED: '핸디 지원',
  ACCEPTED: '핸디',
  DECLINED: '',
  NOT_SUPPORTED: '',
} as const;

export const CANCEL_STATUS_TEXT = {
  CANCEL_REQUEST: '환불 진행 중',
  CANCEL_COMPLETE: '환불 완료',
  NONE: '',
} as const;
