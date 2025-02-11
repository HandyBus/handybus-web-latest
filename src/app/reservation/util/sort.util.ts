import { ShuttleRoute } from '@/types/shuttle-operation.type';
import type { ShuttleSortType } from '../constants/params';
import { dayjsTz } from '@/utils/dayjsTz.util';

export const toSortedRoutes = (
  sort: ShuttleSortType,
  routes: ShuttleRoute[],
) => {
  switch (sort) {
    case '콘서트 이름 가나다 순':
      return routes.toSorted((a, b) =>
        a.event.eventName.localeCompare(b.event.eventName),
      );
    case '셔틀 일자 빠른 순':
      return routes.toSorted((a, b) => {
        const aDate = dayjsTz(
          a.event.dailyEvents.find((v) => v.dailyEventId === a.dailyEventId)
            ?.date || '',
        );
        const bDate = dayjsTz(
          b.event.dailyEvents.find((v) => v.dailyEventId === b.dailyEventId)
            ?.date || '',
        );
        return aDate.getTime() - bDate.getTime();
      });
    case '예약 마감이 임박한 순':
      return routes.toSorted(
        (a, b) =>
          (dayjsTz(a.reservationDeadline).getTime() || 0) -
          (dayjsTz(b.reservationDeadline).getTime() || 0),
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
