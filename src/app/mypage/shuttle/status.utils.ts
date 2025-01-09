const STATUS_STYLE = {
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

export const getStatusStyle = (status: string) => {
  switch (status) {
    case '예약 모집 중':
    case '배차 확정':
      return STATUS_STYLE.fullGreen;
    case '수요 확인 중':
    case '예약 모집 마감':
      return STATUS_STYLE.emptyGreen;
    case '수요 신청 마감':
    case '운행 종료':
      return STATUS_STYLE.darkGrey;
    case '무산':
    case '비활성':
      return STATUS_STYLE.lightGrey;
    default:
      return STATUS_STYLE.lightGrey;
  }
};
