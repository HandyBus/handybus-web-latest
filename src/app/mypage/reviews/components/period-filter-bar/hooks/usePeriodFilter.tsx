import { useState } from 'react';

export type PeriodFilter = 3 | 6 | 12;

const usePeriodFilter = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>(3);

  return { periodFilter, setPeriodFilter };
};

export default usePeriodFilter;
