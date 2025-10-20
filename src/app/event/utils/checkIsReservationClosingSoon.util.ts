import { EventsViewEntity } from '@/types/event.type';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(timezone);
dayjs.extend(utc);

// 행사 첫날을 기준으로 8일 전부터 마감임박 표시 (5일전 예약마감 이므로 3일간 표시)
export const checkIsReservationClosingSoon = ({
  event,
}: {
  event: EventsViewEntity;
}) =>
  (event.eventStatus === 'OPEN' || event.eventStatus === 'CLOSED') &&
  event.eventHasOpenRoute &&
  dayjs(event.startDate)
    .tz('Asia/Seoul')
    .subtract(8, 'day')
    .isBefore(dayjs().tz('Asia/Seoul'));
