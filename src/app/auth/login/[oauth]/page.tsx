'use client';

import { postLogin } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type LoginMethodType = 'kakao' | 'naver';

const OAuth = () => {
  const router = useRouter();

  const handleOAuth = async (url: URL) => {
    const loginMethod = url.pathname.split('/').pop() as LoginMethodType;
    const code = url.searchParams.get('code')!;

    try {
      const tokens = await postLogin(loginMethod, { code });
      console.log('TOKENS: ', tokens);
    } catch (e) {
      console.error(e);
      router.push('/login');
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    handleOAuth(url);
  }, []);

  return <div>oauth</div>;
};

export default OAuth;
