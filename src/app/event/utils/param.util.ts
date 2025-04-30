import {
  EventSortSearchParamsType,
  EventSortType,
  EVENT_SORT_SEARCH_PARAMS,
} from '@/constants/event';

export const fromString = (s: string): EventSortSearchParamsType => {
  switch (s) {
    case 'NAME_ASC':
      return 'NAME_ASC';
    case 'DATE_ASC':
      return 'DATE_ASC';
    default:
      return EVENT_SORT_SEARCH_PARAMS[0];
  }
};

export const toEventSort = (s: EventSortSearchParamsType): EventSortType => {
  switch (s) {
    case 'NAME_ASC':
      return '이름순';
    case 'DATE_ASC':
      return '행사 임박순';
  }
};

export const toEventSortSearchParams = (
  s: EventSortType,
): EventSortSearchParamsType => {
  switch (s) {
    case '이름순':
      return 'NAME_ASC';
    case '행사 임박순':
      return 'DATE_ASC';
  }
};
