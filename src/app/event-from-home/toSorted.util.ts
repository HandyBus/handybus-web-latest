import { EventSortType } from '@/app/event/event.const';
import { EventsViewEntity } from '@/types/event.type';
import dayjs from 'dayjs';

export const toSorted = (events: EventsViewEntity[], sort: EventSortType) => {
  let newData: EventsViewEntity[];
  switch (sort) {
    case 'NAME_ASC':
      newData = events.toSorted((a, b) =>
        a.eventDisplayName.localeCompare(b.eventDisplayName),
      );
      break;
    case 'DATE_ASC':
      newData = events.toSorted(
        (a, b) =>
          (dayjs(a.dailyEvents?.[0]?.dailyEventDate).tz().valueOf() || 0) -
          (dayjs(b.dailyEvents?.[0]?.dailyEventDate).tz().valueOf() || 0),
      );
      break;
  }
  return newData;
};
