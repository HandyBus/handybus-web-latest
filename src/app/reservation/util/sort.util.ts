import type { ShuttleRouteType } from '@/types/shuttle.types';
import type { ShuttleSortType } from '../constants/params';

export const toSortedRoutes = (
  sort: ShuttleSortType,
  routes: ShuttleRouteType[],
) => {
  switch (sort) {
    case '콘서트 이름 가나다 순':
      return routes.toSorted((a, b) =>
        a.shuttle.name.localeCompare(b.shuttle.name),
      );
    case '셔틀 일자 빠른 순':
      return routes.toSorted(
        (a, b) =>
          new Date(
            a.shuttle.dailyShuttles.find(
              (v) => v.dailyShuttleId === a.dailyShuttleId,
            )?.date || '',
          ).getTime() -
          new Date(
            b.shuttle.dailyShuttles.find(
              (v) => v.dailyShuttleId === b.dailyShuttleId,
            )?.date || '',
          ).getTime(),
      );
    case '예약 마감이 임박한 순':
      return routes.toSorted(
        (a, b) =>
          new Date(a.reservationDeadline).getTime() -
          new Date(b.reservationDeadline).getTime(),
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
