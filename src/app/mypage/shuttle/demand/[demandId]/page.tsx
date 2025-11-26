'use client';

import { useEffect } from 'react';

interface Props {
  params: {
    demandId: string;
  };
}

const Page = ({ params }: Props) => {
  const { demandId } = params;
  useEffect(() => {
    window.location.href = `/history/demand/${demandId}`;
  }, [demandId]);
  return null;
};

export default Page;
