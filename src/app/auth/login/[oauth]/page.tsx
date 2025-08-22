'use client';

import Loading from '@/components/loading/Loading';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import usePreventScroll from '@/hooks/usePreventScroll';
import { postLogin } from '@/services/auth.service';
import { CustomError } from '@/services/custom-error';
import { getUser } from '@/services/user.service';
import {
  setAccessToken,
  setOnboardingStatusComplete,
  setOnboardingStatusIncomplete,
  setRefreshToken,
} from '@/utils/handleToken.util';
import {
  removeEntryGreetingIncomplete,
  removeRedirectUrl,
  setEntryGreetingIncomplete,
} from '@/utils/localStorage';
import { getRedirectUrl } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

interface Props {
  params: { oauth: 'kakao' | 'naver' | 'apple' };
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
      const isOnboardingComplete = user?.onboardingComplete || false;
      const isEntryGreetingChecked = user?.entryGreetingChecked || false;

      const redirectUrl = isEntryGreetingChecked
        ? getRedirectUrl() || '/'
        : '/';
      removeRedirectUrl();

      if (isEntryGreetingChecked) {
        removeEntryGreetingIncomplete();
      } else {
        setEntryGreetingIncomplete();
      }

      if (!isOnboardingComplete) {
        setOnboardingStatusIncomplete();
        router.replace('/onboarding');
      } else {
        setOnboardingStatusComplete();
        router.replace(redirectUrl);
      }
    } catch (e) {
      const error = e as CustomError;
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
      router.replace('/login');
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
