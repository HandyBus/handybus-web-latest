import { ID_TO_REGION, REGION_TO_ID } from '@/constants/regions';
import { ShuttleFormValues } from './shuttleForm.type';

export const getRegionId = (
  bigLocation: string,
  smallLocation: string,
): number | undefined => {
  if (!REGION_TO_ID[bigLocation] || !REGION_TO_ID[bigLocation][smallLocation]) {
    return undefined;
  }
  return REGION_TO_ID[bigLocation][smallLocation];
};

export const determineMessage = (
  shuttleStatus:
    | 'OPEN'
    | 'CLOSED'
    | 'ENDED'
    | 'INACTIVE'
    | 'CONFIRMED'
    | 'CANCELLED'
    | undefined,
  type: 'DEMAND' | 'RESERVATION',
): string | undefined => {
  if (type === 'DEMAND' && shuttleStatus === 'OPEN') return '수요 신청하기';
  if (type === 'DEMAND' && shuttleStatus === 'CLOSED')
    return '수요 신청이 마감되었어요';
  if (type === 'RESERVATION' && shuttleStatus === 'OPEN')
    return '셔틀 예약하러 가기';
  if (type === 'RESERVATION' && shuttleStatus === 'CLOSED')
    return '셔틀 예약이 마감되었어요';
  if (type === 'RESERVATION' && shuttleStatus === 'ENDED')
    return '셔틀 예약이 종료되었어요';
  if (type === 'RESERVATION' && shuttleStatus === 'INACTIVE')
    return '셔틀 예약이 비활성화되었어요';
};

export const determineVariant = (
  shuttleStatus:
    | 'OPEN'
    | 'CLOSED'
    | 'ENDED'
    | 'INACTIVE'
    | 'CONFIRMED'
    | 'CANCELLED'
    | undefined,
  type: 'DEMAND' | 'RESERVATION',
  bigLocation: string,
  smallLocation: string,
  dailyShuttle: ShuttleFormValues['dailyShuttle'],
): 'primary' | 'secondary' | undefined => {
  if (
    type === 'DEMAND' &&
    shuttleStatus === 'OPEN' &&
    (!getRegionId(bigLocation, smallLocation) ||
      dailyShuttle.dailyShuttleId) === 0
  )
    return 'secondary';
  if (type === 'DEMAND' && shuttleStatus === 'OPEN') return 'primary';
  if (type === 'DEMAND' && shuttleStatus === 'CLOSED') return 'secondary';
  if (type === 'RESERVATION' && shuttleStatus === 'OPEN') return 'primary';
  if (type === 'RESERVATION' && shuttleStatus === 'CLOSED') return 'secondary';
  if (type === 'RESERVATION' && shuttleStatus === 'ENDED') return 'secondary';
  if (type === 'RESERVATION' && shuttleStatus === 'INACTIVE')
    return 'secondary';
};

export const determineDisabled = (
  shuttleStatus:
    | 'OPEN'
    | 'CLOSED'
    | 'ENDED'
    | 'INACTIVE'
    | 'CONFIRMED'
    | 'CANCELLED'
    | undefined,
  type: 'DEMAND' | 'RESERVATION',
  bigLocation: string,
  smallLocation: string,
  dailyShuttle: ShuttleFormValues['dailyShuttle'],
  shuttleRoute: ShuttleFormValues['shuttleRoute'],
): boolean => {
  if (
    type === 'DEMAND' &&
    shuttleStatus === 'OPEN' &&
    (!getRegionId(bigLocation, smallLocation) ||
      dailyShuttle.dailyShuttleId === 0)
  )
    return true;
  if (type === 'DEMAND' && shuttleStatus === 'CLOSED') return true;
  if (
    type === 'RESERVATION' &&
    dailyShuttle.dailyShuttleId !== 0 &&
    shuttleRoute?.value &&
    shuttleStatus === 'OPEN'
  )
    return false;
  return true;
};

export const locationFormatter = (regionId: number | undefined) => {
  if (!regionId) return '';
  return (
    ID_TO_REGION[regionId].bigRegion + ' ' + ID_TO_REGION[regionId].smallRegion
  );
};
