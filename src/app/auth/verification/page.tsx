'use client';

import Loading from '@/components/loading/Loading';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useEffect, useRef } from 'react';

interface Props {
  searchParams: { identityVerificationId: string };
}

const Page = ({ searchParams }: Props) => {
  const { identityVerificationId } = searchParams;
  const isInitiated = useRef(false);
  usePreventRefresh();
  usePreventScroll();

  const handleIdentityVerification = async () => {
    console.log(identityVerificationId);
  };

  useEffect(() => {
    if (isInitiated.current) {
      return;
    }
    isInitiated.current = true;
    handleIdentityVerification();
  }, []);

  return <Loading />;
};

export default Page;
