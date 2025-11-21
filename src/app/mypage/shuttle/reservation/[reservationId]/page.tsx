'use client';

import { useEffect } from 'react';
import usePopAll from '@/hooks/usePopAll';
import { useFlow } from '@/stacks';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  const flow = useFlow();
  const popAll = usePopAll();
  useEffect(() => {
    popAll({ animate: false });
    flow.replace('History', { type: 'reservation' }, { animate: false });
  }, [popAll, flow, reservationId]);
  return null;
};

export default Page;
