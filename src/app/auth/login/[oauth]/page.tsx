'use client';

import Loading from '@/components/loading/Loading';
import { postLogin } from '@/services/auth.service';
import { getUser } from '@/services/user-management.service';
import {
  setAccessToken,
  setOnboardingToken,
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

  const handleOAuth = async () => {
    try {
      const tokens = await postLogin(params.oauth, {
        code: searchParams.code,
        state: searchParams?.state,
      });

      await Promise.all([
        setAccessToken(tokens.accessToken, tokens.accessTokenExpiresAt),
        setRefreshToken(tokens.refreshToken, tokens.refreshTokenExpiresAt),
      ]);

      const user = await getUser();
      const onboardingProgress = parseProgress(user.progresses);

      if (onboardingProgress !== 'ONBOARDING_COMPLETE') {
        await setOnboardingToken();
        router.push('/onboarding');
      } else {
        router.push('/');
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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <Loading />;
};

export default OAuth;
