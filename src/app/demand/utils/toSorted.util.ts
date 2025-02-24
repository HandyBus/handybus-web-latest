import { DemandSortType } from '@/constants/demand';
import { Event } from '@/types/shuttle-operation.type';
import { dayjsTz } from '@/utils/dayjsTz.util';

export const toSorted = (events: Event[], sort: DemandSortType) => {
  let newData: Event[];
  switch (sort) {
    case '이름순':
      newData = events.toSorted((a, b) =>
        a.eventName.localeCompare(b.eventName),
      );
      break;
    case '행사 임박순':
      newData = events.toSorted(
        (a, b) =>
          (dayjsTz(a.dailyEvents[0].date).getTime() || 0) -
          (dayjsTz(b.dailyEvents[0].date).getTime() || 0),
      );
      break;
  }
  return newData;
};
