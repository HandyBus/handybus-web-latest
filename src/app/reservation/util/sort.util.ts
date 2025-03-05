import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import type { ShuttleSortType } from '../constants/params';
import dayjs from 'dayjs';

export const toSortedRoutes = (
  sort: ShuttleSortType,
  routes: ShuttleRoutesViewEntity[],
) => {
  switch (sort) {
    case '콘서트 이름 가나다 순':
      return routes.toSorted((a, b) =>
        a.event.eventName.localeCompare(b.event.eventName),
      );
    case '셔틀 일자 빠른 순':
      return routes.toSorted((a, b) => {
        const aDate = dayjs(
          a.event.dailyEvents.find((v) => v.dailyEventId === a.dailyEventId)
            ?.date || '',
        ).tz();
        const bDate = dayjs(
          b.event.dailyEvents.find((v) => v.dailyEventId === b.dailyEventId)
            ?.date || '',
        ).tz();
        return aDate.valueOf() - bDate.valueOf();
      });
    case '예약 마감이 임박한 순':
      return routes.toSorted(
        (a, b) =>
          dayjs(a.reservationDeadline).tz().valueOf() -
          dayjs(b.reservationDeadline).tz().valueOf(),
      );
    case '예약한 인원이 많은 순':
      return routes.toSorted(
        (a, b) =>
          b.maxPassengerCount -
          b.remainingSeatCount -
          (a.maxPassengerCount - a.remainingSeatCount),
      );
    case '잔여석이 적게 남은 순':
      return routes.toSorted(
        (a, b) => a.remainingSeatCount - b.remainingSeatCount,
      );
  }
};
