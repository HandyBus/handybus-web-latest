'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  const router = useRouter();
  useEffect(() => {
    router.replace(`/ticket?reservationId=${reservationId}`);
  }, [router, reservationId]);
  return null;
};

export default Page;
