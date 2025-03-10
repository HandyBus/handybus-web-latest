'use client';

import Logo from './icons/logo.svg';
import Kakao from 'public/icons/kakao.svg';
import Naver from 'public/icons/naver.svg';
import Link from 'next/link';
import { OAUTH } from '@/constants/oauth';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const Login = () => {
  usePreventScroll();

  const searchParams = useSearchParams();

  const handleRedirectUrl = () => {
    const redirectUrl = searchParams.get('redirectUrl');
    if (redirectUrl) {
      localStorage.setItem('redirectUrl', encodeURIComponent(redirectUrl));
    } else {
      localStorage.removeItem('redirectUrl');
    }
  };

  useEffect(() => {
    handleRedirectUrl();
  }, [searchParams]);

  return (
    <main className="flex grow flex-col">
      <section className="-my-8 flex flex-1 grow flex-col items-center justify-center gap-16">
        <Logo />
        <p className="text-center text-20 font-600 text-[#181F29]">
          집부터 콘서트장까지
          <br />
          핸디버스와 함께 하세요
        </p>
      </section>
      <section className="p-16">
        <p className="mb-16 text-center text-16 font-600 text-[#181F29]">
          지금 가입하면 <span className="text-primary-main">1만원</span> 쿠폰
          즉시 제공!
        </p>
        <Link
          href={OAUTH.kakao()}
          replace
          className="mb-12 flex h-52 items-center justify-center gap-8 rounded-[8px] bg-[#FEE500] text-16 font-600 text-black/85"
        >
          <Kakao />
          카카오로 시작하기
        </Link>
        <Link
          href={OAUTH.naver()}
          replace
          className="flex h-52 items-center justify-center gap-8 rounded-[8px] bg-[#03C75A] text-16 font-600 text-white"
        >
          <Naver />
          네이버로 시작하기
        </Link>
      </section>
      <section className="flex flex-1 grow flex-col">
        <p className="mx-16 mt-40 border-t border-[#F3F3F3] pt-16 text-center text-12 font-500 text-grey-400">
          로그인은{' '}
          <Link href="/policy" className="underline">
            개인정보 처리 방침
          </Link>{' '}
          및{' '}
          <Link href="/policy" className="underline">
            서비스 이용 약관
          </Link>{' '}
          에 동의하는 것을
          <br />
          의미하며, 서비스 이용을 위해 전화번호, 성별, 연령대를 수집합니다.
        </p>
      </section>
    </main>
  );
};

export default Login;
