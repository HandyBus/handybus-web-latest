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
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import { getIsAppFromUserAgent } from '@/utils/environment.util';

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
    const isAppFromState =
      searchParams?.state && searchParams.state.toLowerCase().includes('app');
    const isAppFromUserAgent = getIsAppFromUserAgent();
    const isApp = isAppFromState || isAppFromUserAgent;

    // 앱 환경인 경우 딥링크로 리다이렉트
    if (isApp && searchParams.code) {
      const deepLinkUrl = `handybus://auth/callback?oauth=${encodeURIComponent(
        params.oauth,
      )}&code=${encodeURIComponent(searchParams.code)}`;

      // Safari는 window.location.href에 커스텀 스킴을 허용하지 않으므로 임시 <a> 태그를 생성하여 클릭하는 방식 사용
      const link = document.createElement('a');
      link.href = deepLinkUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return;
    }

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
      Sentry.captureException(error, {
        tags: {
          component: 'OAuthLogin',
          page: 'auth',
          feature: 'oauth-login',
          oauthProvider: params.oauth,
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          oauthProvider: params.oauth,
          code: searchParams.code ? 'provided' : 'missing',
          state: searchParams.state ? 'provided' : 'missing',
          errorStatusCode: error.statusCode,
          errorMessage: error.message,
          timestamp: dayjs().toISOString(),
        },
      });
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
