'use client';

import Loading from '@/components/loading/Loading';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import usePreventScroll from '@/hooks/usePreventScroll';
import { postLogin } from '@/services/auth.service';
import { CustomError } from '@/services/custom-error';
import { getUser } from '@/services/user-management.service';
import {
  setAccessToken,
  setOnboardingStatusComplete,
  setOnboardingStatusIncomplete,
  setRefreshToken,
} from '@/utils/handleToken.util';
import { parseProgress } from '@/utils/parseProgress.util';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

interface Props {
  params: { oauth: 'kakao' | 'naver' };
  searchParams: { code: string; state?: string };
}

const OAuth = ({ params, searchParams }: Props) => {
  const router = useRouter();
  const isInitiated = useRef(false);
  usePreventRefresh();
  usePreventScroll();

  const handleOAuth = async () => {
    try {
      const tokens = await postLogin(params.oauth, {
        code: searchParams.code,
        state: searchParams?.state,
      });

      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);

      const user = await getUser({ skipCheckOnboarding: true });
      const onboardingProgress = parseProgress(user.progresses);

      const redirectUrl = localStorage.getItem('redirectUrl') || '/';
      localStorage.removeItem('redirectUrl');

      if (onboardingProgress !== 'ONBOARDING_COMPLETE') {
        setOnboardingStatusIncomplete();
        router.replace('/onboarding');
      } else {
        setOnboardingStatusComplete();
        router.replace(decodeURIComponent(redirectUrl));
      }
    } catch (e) {
      const error = e as CustomError;
      console.error(error);
      router.replace('/login');
      if (error.statusCode === 422) {
        toast.error('전화번호가 등록된 계정으로만 회원가입이 가능합니다.');
      }
    }
  };

  useEffect(() => {
    if (isInitiated.current) {
      return;
    }
    isInitiated.current = true;
    handleOAuth();
  }, []);

  return <Loading />;
};

export default OAuth;
