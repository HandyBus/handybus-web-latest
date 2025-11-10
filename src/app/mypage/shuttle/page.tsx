'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/history?type=demand');
  }, [router]);
  return null;
};

export default Page;
