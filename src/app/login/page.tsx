'use client';

import Logo from 'public/icons/logo-large-white.svg';
import Kakao from 'public/icons/kakao.svg';
import Naver from 'public/icons/naver.svg';
import Link from 'next/link';
import { OAUTH } from '@/constants/oauth';
import { instance } from '@/services/config';

const Login = () => {
  const test = async () => {
    const a = await instance.get('/concerts/all/dates/all/shuttles');
    console.log(a);
  };

  test();

  return (
    <main className="flex h-full w-full flex-col items-center bg-primary-main">
      <div className="my-auto flex flex-col items-center">
        <span className="text-18 font-500 text-white">집부터 콘서트장까지</span>
        <span className="mb-32 text-28 font-700 text-white">
          핸디버스와 함께
        </span>
        <Logo />
      </div>
      <div className="mb-16 flex flex-col gap-8">
        <Link
          href={OAUTH.kakao()}
          className="flex h-52 w-320 items-center justify-center gap-16 rounded-full bg-[#FEE500] text-16 font-600 text-black/85"
        >
          <Kakao />
          카카오로 로그인
        </Link>
        <Link
          href={OAUTH.naver()}
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
