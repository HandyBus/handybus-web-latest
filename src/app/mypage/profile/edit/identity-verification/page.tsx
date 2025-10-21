'use client';

import Loading from '@/components/loading/Loading';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import usePreventScroll from '@/hooks/usePreventScroll';
import { postIdentityVerification } from '@/services/auth.service';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

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
      toast.error('연락처가 변경되었어요.');
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
      toast.error('잠시 후 다시 시도해주세요.');
    } finally {
      router.replace('/mypage');
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
