'use client';

import { PeriodFilter } from './hooks/usePeriodFilter';

interface Props {
  periodFilter: PeriodFilter;
  setPeriodFilter: (periodFilter: PeriodFilter) => void;
}

const PeriodFilterBar = ({ periodFilter, setPeriodFilter }: Props) => {
  return (
    <div className="flex shrink-0 gap-8 p-16 pb-0">
      <button
        type="button"
        onClick={() => setPeriodFilter(3)}
        className={`flex h-32 flex-1 items-center justify-center rounded-full bg-basic-grey-100 text-16 font-500 ${
          periodFilter === 3 ? 'text-basic-black' : 'text-basic-grey-500'
        }`}
      >
        3개월
      </button>
      <button
        type="button"
        onClick={() => setPeriodFilter(6)}
        className={`flex h-32 flex-1 items-center justify-center rounded-full bg-basic-grey-100 text-16 font-500 ${
          periodFilter === 6 ? 'text-basic-black' : 'text-basic-grey-500'
        }`}
      >
        6개월
      </button>
      <button
        type="button"
        onClick={() => setPeriodFilter(12)}
        className={`flex h-32 flex-1 items-center justify-center rounded-full bg-basic-grey-100 text-16 font-500 ${
          periodFilter === 12 ? 'text-basic-black' : 'text-basic-grey-500'
        }`}
      >
        1년
      </button>
    </div>
  );
};

export default PeriodFilterBar;
