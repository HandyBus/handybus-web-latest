'use client';

import { PeriodFilter } from './hooks/usePeriodFilter';

interface Props {
  periodFilter: PeriodFilter;
  setPeriodFilter: (periodFilter: PeriodFilter) => void;
}

const PeriodFilterBar = ({ periodFilter, setPeriodFilter }: Props) => {
  return (
    <div className="flex gap-8 p-16 pb-0">
      <button
        type="button"
        onClick={() => setPeriodFilter('3_MONTHS')}
        className={`flex h-32 flex-1 items-center justify-center rounded-full bg-basic-grey-100 text-16 font-500 ${
          periodFilter === '3_MONTHS'
            ? 'text-basic-black'
            : 'text-basic-grey-500'
        }`}
      >
        3개월
      </button>
      <button
        type="button"
        onClick={() => setPeriodFilter('6_MONTHS')}
        className={`flex h-32 flex-1 items-center justify-center rounded-full bg-basic-grey-100 text-16 font-500 ${
          periodFilter === '6_MONTHS'
            ? 'text-basic-black'
            : 'text-basic-grey-500'
        }`}
      >
        6개월
      </button>
      <button
        type="button"
        onClick={() => setPeriodFilter('1_YEAR')}
        className={`flex h-32 flex-1 items-center justify-center rounded-full bg-basic-grey-100 text-16 font-500 ${
          periodFilter === '1_YEAR' ? 'text-basic-black' : 'text-basic-grey-500'
        }`}
      >
        1년
      </button>
    </div>
  );
};

export default PeriodFilterBar;
