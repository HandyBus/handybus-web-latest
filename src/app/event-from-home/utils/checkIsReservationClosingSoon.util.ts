import { EventsViewEntity } from '@/types/event.type';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(timezone);
dayjs.extend(utc);

// 지나지 않은 일일 행사 중 가장 가까운 날짜 기준으로 8일 전부터 마감임박 표시 (5일전 예약마감 이므로 3일간 표시)
export const checkIsReservationClosingSoon = ({
  event,
}: {
  event: EventsViewEntity;
}) => {
  const hasOpenRoute =
    (event.eventStatus === 'OPEN' || event.eventStatus === 'CLOSED') &&
    event.eventHasOpenRoute;

  const dailyEventsAfterToday = event.dailyEvents.filter((dailyEvent) =>
    dayjs(dailyEvent.dailyEventDate)
      .tz('Asia/Seoul')
      .isAfter(dayjs().tz('Asia/Seoul')),
  );

  const isDailyEventDateSoon = dailyEventsAfterToday.some((dailyEvent) =>
    dayjs(dailyEvent.dailyEventDate)
      .tz('Asia/Seoul')
      .isBefore(dayjs().tz('Asia/Seoul').add(8, 'day')),
  );

  return hasOpenRoute && isDailyEventDateSoon;
};
