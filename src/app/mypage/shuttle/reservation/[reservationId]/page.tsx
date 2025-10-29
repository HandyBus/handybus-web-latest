'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  const router = useRouter();
  useEffect(() => {
    router.replace(`/history/reservation/${reservationId}`);
  }, [router, reservationId]);
  return null;
};

export default Page;
