import { HandyStatus, ReservationStatus } from '@/types/reservation.type';
import { ShuttleDemandStatus } from '@/types/demand.type';

const STATUS_STYLE = {
  fullGreen: {
    dot: 'bg-brand-primary-400',
    text: 'text-brand-primary-400',
  },
  emptyGreen: {
    dot: 'border-2 border-brand-primary-400',
    text: 'text-brand-primary-400',
  },
  darkGrey: {
    dot: 'bg-brand-grey-700',
    text: 'text-brand-grey-700',
  },
  lightGrey: {
    dot: 'bg-brand-grey-500',
    text: 'text-brand-grey-500',
  },
  black: {
    dot: 'bg-basic-black',
    text: 'text-basic-black',
  },
  red: {
    dot: 'bg-basic-red-500',
    text: 'text-basic-red-500',
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
      return 'text-basic-blue-1000';
    case 'DECLINED':
      return 'text-brand-grey-400';
    case 'SUPPORTED':
      return 'text-brand-primary-400';
    default:
      return 'text-brand-grey-400';
  }
};
