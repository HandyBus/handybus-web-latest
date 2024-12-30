import {
  DailyShuttleDetailProps,
  ShuttleRouteEvent,
} from '@/types/shuttle.types';
import { EventDetailProps } from '@/types/event.types';

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

export const dateFormatter = (data: EventDetailProps | ShuttleRouteEvent) => {
  const formatDate = (dateStr: string) => {
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

  if (data.dailyShuttles.length === 0) return '';

  const dateArray = data.dailyShuttles.map(
    (v: DailyShuttleDetailProps) => v.date,
  );

  return dateArray.length === 1
    ? formatDate(dateArray[0])
    : `${formatDate(dateArray[0])} ~ ${formatDate(dateArray[dateArray.length - 1])}`;
};

export const shuttleStateConverter = (
  status: string,
  type: 'DEMAND' | 'RESERVATION',
) => {
  if (status === 'OPEN') return type === 'DEMAND' ? 'DEMAND_SURVEY' : 'PENDING';
  if (status === 'CLOSED')
    return type === 'DEMAND' ? 'SURVEY_CLOSED' : 'RESERVATION_CLOSED';
  if (status === 'ENDED') return 'ENDED';
  return undefined;
};
