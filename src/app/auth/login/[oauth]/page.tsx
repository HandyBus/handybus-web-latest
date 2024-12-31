'use client';

import Loading from '@/components/loading/Loading';
import { postLogin } from '@/services/auth';
import { getProgress } from '@/services/users';
import { setAccessToken, setRefreshToken } from '@/utils/handleToken';
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

      const progress = await getProgress();

      if (progress !== 'ONBOARDING_COMPLETE') {
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
