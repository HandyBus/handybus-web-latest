'use client';

import Loading from '@/components/loading/Loading';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import usePreventScroll from '@/hooks/usePreventScroll';
import { postIdentityVerification } from '@/services/auth.service';
import { logout, setOnboardingStatusComplete } from '@/utils/handleToken.util';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

interface Props {
  searchParams: { identityVerificationId: string };
}

const Page = ({ searchParams }: Props) => {
  const { identityVerificationId } = searchParams;
  const isInitiated = useRef(false);
  usePreventRefresh();
  usePreventScroll();

  const handleIdentityVerification = async () => {
    try {
      await postIdentityVerification({
        identityVerificationId,
      });
      setOnboardingStatusComplete();
      window.location.href = '/';
    } catch (e) {
      Sentry.captureException(e, {
        tags: {
          component: 'IdentityVerification',
          page: 'auth',
          feature: 'identity-verification',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          identityVerificationId,
          timestamp: dayjs().toISOString(),
        },
      });
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
