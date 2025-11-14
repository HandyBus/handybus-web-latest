export const EVENT_SORT = ['DATE_ASC', 'NAME_ASC'] as const;

export type EventSortType = (typeof EVENT_SORT)[number];
