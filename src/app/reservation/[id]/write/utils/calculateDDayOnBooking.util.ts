import { TripType } from '@/types/shuttleRoute.type';
import dayjs from 'dayjs';

import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Props {
  type: TripType | undefined;
  toDestinationArrivalTime: string | undefined;
  fromDestinationArrivalTime: string | undefined;
}

export const calculateDDayOnBooking = ({
  type,
  toDestinationArrivalTime,
  fromDestinationArrivalTime,
}: Props): string | undefined => {
  let arrivalTime: string | undefined;

  if (type === 'ROUND_TRIP' || type === 'TO_DESTINATION') {
    arrivalTime = toDestinationArrivalTime;
  }

  if (type === 'FROM_DESTINATION') {
    arrivalTime = fromDestinationArrivalTime;
  }

  return arrivalTime
    ? dayjs(arrivalTime)
        .startOf('day')
        .format('YYYY. MM. DD. (ddd)')
        .replace('요일', '')
    : undefined;
};
