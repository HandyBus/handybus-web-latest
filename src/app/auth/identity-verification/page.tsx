'use client';

import Loading from '@/components/loading/Loading';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import usePreventScroll from '@/hooks/usePreventScroll';
import { postIdentityVerification } from '@/services/auth.service';
import { logout, setOnboardingStatusComplete } from '@/utils/handleToken.util';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

interface Props {
  searchParams: { identityVerificationId: string };
}

const Page = ({ searchParams }: Props) => {
  const { identityVerificationId } = searchParams;
  const router = useRouter();
  const isInitiated = useRef(false);
  usePreventRefresh();
  usePreventScroll();

  const handleIdentityVerification = async () => {
    try {
      await postIdentityVerification({
        identityVerificationId,
      });
      setOnboardingStatusComplete();
      router.replace('/');
    } catch (e) {
      console.error(e);
      toast.error('회원가입에 실패했어요.');
      logout();
    }
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
