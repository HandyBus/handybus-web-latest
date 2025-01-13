export const DEMAND_SORT = [
  // '수요 신청한 인원이 많은 순',
  '셔틀 일자 빠른 순',
  '콘서트 이름 가나다 순',
] as const;

export type DemandSortType = (typeof DEMAND_SORT)[number];

export const DEMAND_SORT_SEARCH_PARAMS = [
  'NAME_ASC',
  'DATE_ASC',
  // 'DEMAND_DESC',
] as const;

export type DemandSortSearchParamsType =
  (typeof DEMAND_SORT_SEARCH_PARAMS)[number];
