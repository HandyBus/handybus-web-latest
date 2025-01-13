import {
  DemandSortSearchParamsType,
  DemandSortType,
  DEMAND_SORT_SEARCH_PARAMS,
} from '@/constants/demand';

export const fromString = (s: string): DemandSortSearchParamsType => {
  switch (s) {
    case 'NAME_ASC':
      return 'NAME_ASC';
    case 'DATE_ASC':
      return 'DATE_ASC';
    // case 'DEMAND_DESC':
    // return 'DEMAND_DESC';
    default:
      return DEMAND_SORT_SEARCH_PARAMS[0];
  }
};

export const toDemandSort = (s: DemandSortSearchParamsType): DemandSortType => {
  switch (s) {
    case 'NAME_ASC':
      return '콘서트 이름 가나다 순';
    case 'DATE_ASC':
      return '셔틀 일자 빠른 순';
    // case 'DEMAND_DESC':
    // return '수요 신청한 인원이 많은 순';
  }
};

export const toDemandSortSearchParams = (
  s: DemandSortType,
): DemandSortSearchParamsType => {
  switch (s) {
    case '콘서트 이름 가나다 순':
      return 'NAME_ASC';
    case '셔틀 일자 빠른 순':
      return 'DATE_ASC';
    // case '수요 신청한 인원이 많은 순':
    // return 'DEMAND_DESC';
  }
};
