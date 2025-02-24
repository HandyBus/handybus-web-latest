export const DEMAND_SORT = ['행사 임박순', '이름순'] as const;

export type DemandSortType = (typeof DEMAND_SORT)[number];

export const DEMAND_SORT_SEARCH_PARAMS = ['DATE_ASC', 'NAME_ASC'] as const;

export type DemandSortSearchParamsType =
  (typeof DEMAND_SORT_SEARCH_PARAMS)[number];
