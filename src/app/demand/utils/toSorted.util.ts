import { DemandSortType } from '@/constants/demand';
import { EventsViewEntity } from '@/types/shuttle-operation.type';
import dayjs from 'dayjs';

export const toSorted = (events: EventsViewEntity[], sort: DemandSortType) => {
  let newData: EventsViewEntity[];
  switch (sort) {
    case '이름순':
      newData = events.toSorted((a, b) =>
        a.eventName.localeCompare(b.eventName),
      );
      break;
    case '행사 임박순':
      newData = events.toSorted(
        (a, b) =>
          (dayjs(a.dailyEvents[0].date).tz().valueOf() || 0) -
          (dayjs(b.dailyEvents[0].date).tz().valueOf() || 0),
      );
      break;
  }
  return newData;
};
