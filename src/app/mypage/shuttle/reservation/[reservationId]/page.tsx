'use client';

import { useEffect } from 'react';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;

  useEffect(() => {
    window.location.href = `/history/reservation/${reservationId}`;
  }, [reservationId]);
  return null;
};

export default Page;
