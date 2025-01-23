import {
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
    dot: 'bg-red-500',
    text: 'text-red-500',
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
    case 'NOT_PAYMENT':
      return STATUS_STYLE.red;
    default:
      return STATUS_STYLE.lightGrey;
  }
};
