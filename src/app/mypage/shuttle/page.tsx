'use client';

import { useEffect } from 'react';
import { useFlow } from '@/stacks';
import usePopAll from '@/hooks/usePopAll';

const Page = () => {
  const flow = useFlow();
  const popAll = usePopAll();
  useEffect(() => {
    popAll({ animate: false });
    flow.replace('History', { type: 'demand' }, { animate: false });
  }, [popAll, flow]);
  return null;
};

export default Page;
