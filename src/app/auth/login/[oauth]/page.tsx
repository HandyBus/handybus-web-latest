'use client';

import Loading from '@/components/loading/Loading';
import usePreventRefresh from '@/hooks/usePreventRefresh';
import usePreventScroll from '@/hooks/usePreventScroll';
import { postLogin } from '@/services/auth.service';
import { getUser } from '@/services/user-management.service';
import {
  setAccessToken,
  setIsLoggedIn,
  setIsOnboarding,
  setRefreshToken,
} from '@/utils/handleToken.util';
import { parseProgress } from '@/utils/parseProgress.util';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
      setIsLoggedIn();

      const user = await getUser();
      const onboardingProgress = parseProgress(user.progresses);

      const redirectUrl = localStorage.getItem('redirectUrl') || '/';
      localStorage.removeItem('redirectUrl');

      if (onboardingProgress !== 'ONBOARDING_COMPLETE') {
        setIsOnboarding();
        router.push('/onboarding');
      } else {
        router.replace(decodeURIComponent(redirectUrl));
      }
    } catch (e) {
      console.error(e);
      router.push('/login');
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
