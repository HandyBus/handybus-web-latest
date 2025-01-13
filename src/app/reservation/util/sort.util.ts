import type { ShuttleSortType } from '../constants/params';
import { ShuttleRoute } from '@/types/shuttle-operation.type';

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
      return routes.toSorted(
        (a, b) =>
          (a.event.dailyEvents
            ?.find((v) => v.dailyEventId === a.dailyEventId)
            ?.date?.getTime() || 0) -
          (b.event.dailyEvents
            ?.find((v) => v.dailyEventId === b.dailyEventId)
            ?.date?.getTime() || 0),
      );
    case '예약 마감이 임박한 순':
      return routes.toSorted(
        (a, b) =>
          (a.reservationDeadline?.getTime() || 0) -
          (b.reservationDeadline?.getTime() || 0),
      );
    case '예약한 인원이 많은 순':
      return routes.toSorted(
        (a, b) =>
          a.maxPassengerCount -
          a.remainingSeatCount -
          (b.maxPassengerCount - b.remainingSeatCount),
      );
    case '잔여석이 적게 남은 순':
      return routes.toSorted(
        (a, b) => a.remainingSeatCount - b.remainingSeatCount,
      );
  }
};
