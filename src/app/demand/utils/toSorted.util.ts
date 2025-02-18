import { DemandSortType } from '@/constants/demand';
import { Event } from '@/types/shuttle-operation.type';
import { dayjsTz } from '@/utils/dayjsTz.util';

export const toSorted = (events: Event[], sort: DemandSortType) => {
  let newData: Event[];
  switch (sort) {
    // case '수요 신청한 인원이 많은 순':
    //   newData = events.toSorted(
    //     (a, b) => a.totalDemandCount - b.totalDemandCount,
    //   );
    //   break;
    case '콘서트 이름 가나다 순':
      newData = events.toSorted((a, b) =>
        a.eventName.localeCompare(b.eventName),
      );
      break;
    case '셔틀 일자 빠른 순':
      newData = events.toSorted(
        (a, b) =>
          (dayjsTz(a.dailyEvents[0].date).getTime() || 0) -
          (dayjsTz(b.dailyEvents[0].date).getTime() || 0),
      );
      break;
  }
  return newData;
};
