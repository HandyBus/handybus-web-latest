import { DailyShuttleType } from '@/types/shuttle.types';

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    })
    .replace(/\. /g, '-')
    .replace('.', '')
    .replace('-(', ' (');
};

export const dateFormatter = (dailyShuttle: DailyShuttleType[]) => {
  if (!dailyShuttle || dailyShuttle.length === 0) return '';
  const dateArray = dailyShuttle.map((v: DailyShuttleType) => v.date);
  return dateArray.length === 1
    ? formatDate(dateArray[0])
    : `${formatDate(dateArray[0])} ~ ${formatDate(dateArray[dateArray.length - 1])}`;
};

export const shuttleStateConverter = (
  status: string,
  type: 'DEMAND' | 'RESERVATION',
) => {
  if (status === 'OPEN') return type === 'DEMAND' ? 'DEMAND_SURVEY' : 'PENDING';
  if (status === 'CLOSED' || status === 'CONFIRMED')
    return type === 'DEMAND' ? 'SURVEY_CLOSED' : 'RESERVATION_CLOSED';
  if (status === 'ENDED') return 'ENDED';
  return undefined;
};
