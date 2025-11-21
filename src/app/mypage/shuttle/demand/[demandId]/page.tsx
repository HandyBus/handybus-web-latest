'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  params: {
    demandId: string;
  };
}

const Page = ({ params }: Props) => {
  const { demandId } = params;
  const router = useRouter();
  useEffect(() => {
    router.replace('/history?type=demand');
  }, [router, demandId]);
  return null;
};

export default Page;
