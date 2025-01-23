'use client';

import LogoLarge from 'public/icons/logo-large.svg';
import Kakao from 'public/icons/kakao.svg';
import Naver from 'public/icons/naver.svg';
import Link from 'next/link';
import { OAUTH } from '@/constants/oauth';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useCallback, useEffect } from 'react';

interface Props {
  searchParams: {
    redirectUrl: string | null | undefined;
  };
}

const Login = ({ searchParams }: Props) => {
  usePreventScroll();

  const handleRedirectUrl = useCallback(() => {
    const redirectUrl = searchParams.redirectUrl;
    if (redirectUrl) {
      localStorage.setItem('redirectUrl', redirectUrl);
    } else {
      localStorage.removeItem('redirectUrl');
    }
  }, [searchParams]);

  useEffect(() => {
    handleRedirectUrl();
  }, [searchParams]);

  return (
    <main className="flex grow flex-col items-center bg-white">
      <div className="my-auto flex flex-col items-center">
        <span className="text-18 font-500 text-black">집부터 콘서트장까지</span>
        <span className="mb-32 text-28 font-700 text-black">
          핸디버스와 함께
        </span>
        <LogoLarge viewBox="0 0 121 75" width={215} height={108} />
      </div>
      <div className="mb-16 flex flex-col gap-8">
        <Link
          href={OAUTH.kakao()}
          replace
          className="flex h-52 w-320 items-center justify-center gap-16 rounded-full bg-[#FEE500] text-16 font-600 text-black/85"
        >
          <Kakao />
          카카오로 로그인
        </Link>
        <Link
          href={OAUTH.naver()}
          replace
          className="flex h-52 w-320 items-center justify-center gap-16 rounded-full bg-[#03C75A] text-16 font-600 text-white"
        >
          <Naver />
          네이버로 로그인
        </Link>
      </div>
    </main>
  );
};

export default Login;
