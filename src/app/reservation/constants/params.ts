export const SHUTTLE_SORT = [
  '잔여석이 적게 남은 순',
  '예약한 인원이 많은 순',
  '예약 마감이 임박한 순',
  '셔틀 일자 빠른 순',
  '콘서트 이름 가나다 순',
] as const;

export type ShuttleSortType = (typeof SHUTTLE_SORT)[number];

export const SHUTTLE_SORT_SEARCH_PARAMS = [
  'SEATS_DESC',
  'RESERVATION_DESC',
  'DEADLINE_ASC',
  'DATE_ASC',
  'NAME_ASC',
] as const;

export type ShuttleSortSearchParamsType =
  (typeof SHUTTLE_SORT_SEARCH_PARAMS)[number];

export const shuttleSortSearchParamsFromString = (
  s: string,
): ShuttleSortSearchParamsType => {
  switch (s) {
    case 'SEATS_DESC':
      return 'SEATS_DESC';
    case 'RESERVATION_DESC':
      return 'RESERVATION_DESC';
    case 'DEADLINE_ASC':
      return 'DEADLINE_ASC';
    case 'DATE_ASC':
      return 'DATE_ASC';
    case 'NAME_ASC':
      return 'NAME_ASC';
    default:
      return SHUTTLE_SORT_SEARCH_PARAMS[0];
  }
};

export const searchParamToSort = (
  s: ShuttleSortSearchParamsType,
): ShuttleSortType => {
  switch (s) {
    case 'SEATS_DESC':
      return '잔여석이 적게 남은 순';
    case 'RESERVATION_DESC':
      return '예약한 인원이 많은 순';
    case 'DEADLINE_ASC':
      return '예약 마감이 임박한 순';
    case 'DATE_ASC':
      return '셔틀 일자 빠른 순';
    case 'NAME_ASC':
      return '콘서트 이름 가나다 순';
  }
};

export const shuttleSortToSearchParam = (
  s: ShuttleSortType,
): ShuttleSortSearchParamsType => {
  switch (s) {
    case '잔여석이 적게 남은 순':
      return 'SEATS_DESC';
    case '예약한 인원이 많은 순':
      return 'RESERVATION_DESC';
    case '예약 마감이 임박한 순':
      return 'DEADLINE_ASC';
    case '셔틀 일자 빠른 순':
      return 'DATE_ASC';
    case '콘서트 이름 가나다 순':
      return 'NAME_ASC';
  }
};

export const MAP_SEARCH_PARAMS_TO_SHUTTLE_SORT: Record<
  ShuttleSortSearchParamsType,
  ShuttleSortType
> = {
  SEATS_DESC: '잔여석이 적게 남은 순',
  RESERVATION_DESC: '예약한 인원이 많은 순',
  DEADLINE_ASC: '예약 마감이 임박한 순',
  DATE_ASC: '셔틀 일자 빠른 순',
  NAME_ASC: '콘서트 이름 가나다 순',
};
