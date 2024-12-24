import { STATUS_STYLE, StatusType } from './shuttle.constants';

export const getStatusStyle = (status: StatusType) => {
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
  }
};
