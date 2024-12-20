'use client';

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_AT,
} from '@/constants/token';
import { postLogin } from '@/services/auth';
import { getProgress } from '@/services/users';
import { setCookie } from '@/utils/handleCookie';
import { setSession } from '@/utils/handleSession';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { BeatLoader } from 'react-spinners';

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
        setCookie(
          REFRESH_TOKEN,
          tokens.refreshToken,
          new Date(tokens.refreshTokenExpiresAt),
        ),
        setCookie(
          REFRESH_TOKEN_EXPIRES_AT,
          tokens.refreshTokenExpiresAt,
          new Date(tokens.refreshTokenExpiresAt),
        ),
        setCookie(
          ACCESS_TOKEN,
          tokens.accessToken,
          new Date(tokens.accessTokenExpiresAt),
        ),
        setCookie(
          ACCESS_TOKEN_EXPIRES_AT,
          tokens.accessTokenExpiresAt,
          new Date(tokens.accessTokenExpiresAt),
        ),
      ]);

      const progress = await getProgress();

      if (progress !== 'ONBOARDING_COMPLETE') {
        router.push('/onboarding');
      } else {
        setSession();
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

  return (
    <div className="flex h-screen items-center justify-center">
      <BeatLoader color="#9edbcc" />
    </div>
  );
};

export default OAuth;
