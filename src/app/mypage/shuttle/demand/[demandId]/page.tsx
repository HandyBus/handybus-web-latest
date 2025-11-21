'use client';

import usePopAll from '@/hooks/usePopAll';
import { useFlow } from '@/stacks';
import { useEffect } from 'react';

interface Props {
  params: {
    demandId: string;
  };
}

const Page = ({ params }: Props) => {
  const { demandId } = params;
  const flow = useFlow();
  const popAll = usePopAll();
  useEffect(() => {
    popAll({ animate: false });
    flow.replace('History', { type: 'demand' }, { animate: false });
  }, [popAll, flow, demandId]);
  return null;
};

export default Page;
