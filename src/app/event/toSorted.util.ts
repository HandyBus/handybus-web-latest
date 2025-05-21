import { EventSortType } from '@/app/event/event.const';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import dayjs from 'dayjs';

export const toSorted = (
  events: EventWithRoutesViewEntity[],
  sort: EventSortType,
) => {
  let newData: EventWithRoutesViewEntity[];
  switch (sort) {
    case 'NAME_ASC':
      newData = events.toSorted((a, b) =>
        a.eventName.localeCompare(b.eventName),
      );
      break;
    case 'DATE_ASC':
      newData = events.toSorted(
        (a, b) =>
          (dayjs(a.dailyEvents[0].date).tz().valueOf() || 0) -
          (dayjs(b.dailyEvents[0].date).tz().valueOf() || 0),
      );
      break;
  }
  return newData;
};
