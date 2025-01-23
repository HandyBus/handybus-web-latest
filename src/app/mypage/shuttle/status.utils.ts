import {
  HandyStatus,
  ReservationStatus,
  ShuttleDemandStatus,
} from '@/types/user-management.type';

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
  black: {
    dot: 'bg-black',
    text: 'text-black',
  },
  red: {
    dot: 'bg-red-700',
    text: 'text-red-700',
  },
};

export const getDemandStatusStyle = (status: ShuttleDemandStatus) => {
  switch (status) {
    case 'OPEN':
      return STATUS_STYLE.emptyGreen;
    case 'CLOSED':
    case 'ENDED':
      return STATUS_STYLE.darkGrey;
    case 'CANCELLED':
    case 'INACTIVE':
      return STATUS_STYLE.lightGrey;
    default:
      return STATUS_STYLE.lightGrey;
  }
};

export const getReservationStatusStyle = (status: ReservationStatus) => {
  switch (status) {
    case 'COMPLETE_PAYMENT':
      return STATUS_STYLE.black;
    case 'CANCEL':
      return STATUS_STYLE.red;
    default:
      return STATUS_STYLE.lightGrey;
  }
};

export const getHandyStatusStyle = (status: HandyStatus) => {
  switch (status) {
    case 'ACCEPTED':
      return 'text-blue-500';
    case 'DECLINED':
      return 'text-grey-400';
    case 'NOT_SUPPORTED':
      return 'text-primary-main';
    default:
      return 'text-grey-400';
  }
};
