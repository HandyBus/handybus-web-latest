'use client';

import { useEffect } from 'react';
import { useFlow } from '@/stacks';
import usePopAll from '@/hooks/usePopAll';

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
    flow.replace('Ticket', { reservationId }, { animate: false });
  }, [popAll, flow, reservationId]);
  return null;
};

export default Page;
