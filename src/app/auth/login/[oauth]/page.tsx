'use client';

import Loading from '@/components/loading/Loading';
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
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import { getIsAppFromUserAgent } from '@/utils/environment.util';
import { requestMessageToAppForPushToken } from '@/utils/webview.util';

interface Props {
  params: { oauth: 'kakao' | 'naver' | 'apple' };
  searchParams: { code: string; state?: string };
}

const OAuth = ({ params, searchParams }: Props) => {
  const isInitiated = useRef(false);
  usePreventScroll();

  const handleOAuth = useCallback(async () => {
    const isAppFromState =
      searchParams?.state && searchParams.state.toLowerCase().includes('app');
    const isAppFromEnvironment = getIsAppFromUserAgent();

    // deprecated: 앱 환경에서 외부 브라우저로 연결되어 로그인 했을 시 사용되는 로직
    // 현재는 IOS 앱 정책으로 이용하지 않음.
    if (isAppFromState && !isAppFromEnvironment) {
      let deepLinkUrl = `handybus://?path=/auth/login/${params.oauth}`;
      if (searchParams.code) {
        deepLinkUrl += `&code=${encodeURIComponent(searchParams.code)}`;
      }
      if (searchParams?.state) {
        deepLinkUrl += `&state=${encodeURIComponent(searchParams.state)}`;
      }

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
      requestMessageToAppForPushToken();

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
        // Stackflow 라우트로 이동할 때는 전체 페이지 리로드 필요
        window.location.href = '/onboarding';
      } else {
        setOnboardingStatusComplete();
        // Stackflow 라우트로 이동할 때는 전체 페이지 리로드 필요
        window.location.href = redirectUrl;
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
      // Stackflow 라우트로 이동할 때는 전체 페이지 리로드 필요
      window.location.href = '/login';
    }
  }, [params.oauth, searchParams]);

  useEffect(() => {
    if (isInitiated.current) {
      return;
    }
    isInitiated.current = true;
    handleOAuth();
  }, [handleOAuth]);

  return <Loading />;
};

export default OAuth;
