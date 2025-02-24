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
    default:
      return DEMAND_SORT_SEARCH_PARAMS[0];
  }
};

export const toDemandSort = (s: DemandSortSearchParamsType): DemandSortType => {
  switch (s) {
    case 'NAME_ASC':
      return '이름순';
    case 'DATE_ASC':
      return '행사 임박순';
  }
};

export const toDemandSortSearchParams = (
  s: DemandSortType,
): DemandSortSearchParamsType => {
  switch (s) {
    case '이름순':
      return 'NAME_ASC';
    case '행사 임박순':
      return 'DATE_ASC';
  }
};
