export const EVENT_SORT = ['행사 임박순', '이름순'] as const;

export type EventSortType = (typeof EVENT_SORT)[number];

export const EVENT_SORT_SEARCH_PARAMS = ['DATE_ASC', 'NAME_ASC'] as const;

export type EventSortSearchParamsType =
  (typeof EVENT_SORT_SEARCH_PARAMS)[number];
