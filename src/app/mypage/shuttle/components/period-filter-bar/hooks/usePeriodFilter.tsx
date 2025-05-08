import { useState } from 'react';

export type PeriodFilter = '3_MONTHS' | '6_MONTHS' | '1_YEAR';

const usePeriodFilter = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('3_MONTHS');

  return { periodFilter, setPeriodFilter };
};

export default usePeriodFilter;
