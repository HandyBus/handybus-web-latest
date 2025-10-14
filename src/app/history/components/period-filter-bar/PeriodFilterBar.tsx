'use client';

import { customTwMerge } from 'tailwind.config';
import { PeriodFilter } from './hooks/usePeriodFilter';

interface Props {
  periodFilter: PeriodFilter;
  setPeriodFilter: (periodFilter: PeriodFilter) => void;
}

const PeriodFilterBar = ({ periodFilter, setPeriodFilter }: Props) => {
  return (
    <div className="flex shrink-0 gap-8 p-16">
      <button
        type="button"
        onClick={() => setPeriodFilter(3)}
        className={customTwMerge(
          'flex h-32 flex-1 items-center justify-center rounded-full bg-basic-white text-16 font-500 text-basic-grey-500',
          periodFilter === 3 && 'bg-basic-black text-basic-white',
        )}
      >
        3개월
      </button>
      <button
        type="button"
        onClick={() => setPeriodFilter(6)}
        className={customTwMerge(
          'flex h-32 flex-1 items-center justify-center rounded-full bg-basic-white text-16 font-500 text-basic-grey-500',
          periodFilter === 6 && 'bg-basic-black text-basic-white',
        )}
      >
        6개월
      </button>
      <button
        type="button"
        onClick={() => setPeriodFilter(12)}
        className={customTwMerge(
          'flex h-32 flex-1 items-center justify-center rounded-full bg-basic-white text-16 font-500 text-basic-grey-500',
          periodFilter === 12 && 'bg-basic-black text-basic-white',
        )}
      >
        1년
      </button>
      <button
        type="button"
        onClick={() => setPeriodFilter('ALL')}
        className={customTwMerge(
          'flex h-32 flex-1 items-center justify-center rounded-full bg-basic-white text-16 font-500 text-basic-grey-500',
          periodFilter === 'ALL' && 'bg-basic-black text-basic-white',
        )}
      >
        전체
      </button>
    </div>
  );
};

export default PeriodFilterBar;
