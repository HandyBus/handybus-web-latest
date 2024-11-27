'use client';

import { postLogin } from '@/services/auth';
import { getUser } from '@/services/users';
import { setSession } from '@/utils/handleSession';
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
      setSession({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });

      const user = await getUser();
      if (user.ageRange === '연령대 미지정' || !user.ageRange) {
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

  return <div />;
};

export default OAuth;
