'use client';

import Logo from './icons/logo.svg';
import KakaoIcon from 'public/icons/kakao.svg';
import NaverIcon from 'public/icons/naver.svg';
import Link from 'next/link';
import { OAUTH } from '@/constants/oauth';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getLastLogin,
  removeRedirectUrl,
  setLastLogin,
  setRedirectUrl,
} from '@/utils/localStorage';
import { LOGIN_REDIRECT_URL_KEY } from '@/hooks/useAuthRouter';
import AppleLogin from 'react-apple-login';
import AppleIcon from './icons/apple.svg';

const Login = () => {
  usePreventScroll();

  const searchParams = useSearchParams();

  const handleRedirectUrl = () => {
    const redirectUrl = searchParams.get(LOGIN_REDIRECT_URL_KEY);
    if (redirectUrl) {
      setRedirectUrl(redirectUrl);
    } else {
      removeRedirectUrl();
    }
  };

  useEffect(() => {
    handleRedirectUrl();
  }, [searchParams]);

  const [lastLoginState, setLastLoginState] = useState<
    'kakao' | 'naver' | null
  >(null);

  useEffect(() => {
    const newLastLogin = getLastLogin();
    if (newLastLogin) {
      setLastLoginState(newLastLogin);
    }
  }, []);

  return (
    <main className="flex grow flex-col">
      <section className="-my-8 flex flex-1 grow flex-col items-center justify-center gap-16">
        <div className="min-h-64" />
        <Logo />
        <p className="text-center text-20 font-600 text-[#181F29]">
          집부터 콘서트장까지
          <br />
          핸디버스와 함께 하세요
        </p>
      </section>
      <section className="p-16">
        <p className="mb-16 text-center text-16 font-600 text-[#181F29]">
          지금 로그인하고 원하는 행사까지 편하게 이동하세요.
        </p>
        <button
          onClick={() => setLastLogin('kakao')}
          type="button"
          className="mb-12 w-full rounded-8"
        >
          <Link
            href={OAUTH.kakao()}
            replace
            className="relative flex h-52 items-center justify-center gap-8 rounded-8 bg-[#FEE500] text-16 font-600 text-basic-black/85"
          >
            <KakaoIcon />
            카카오로 시작하기
            {lastLoginState === 'kakao' && <LastLoginChip />}
          </Link>
        </button>
        <button
          onClick={() => setLastLogin('naver')}
          type="button"
          className="mb-12 w-full rounded-8"
        >
          <Link
            href={OAUTH.naver()}
            replace
            className="relative flex h-52 items-center justify-center gap-8 rounded-8 bg-[#03C75A] text-16 font-600 text-basic-white"
          >
            <NaverIcon />
            네이버로 시작하기
            {lastLoginState === 'naver' && <LastLoginChip />}
          </Link>
        </button>
        <AppleLogin
          clientId={'com.handybus.web'}
          redirectURI={'https://www.handybus.co.kr/auth/login/apple'}
          responseType={'code'}
          responseMode={'query'}
          usePopup={false}
          render={({ onClick }) => (
            <button
              type="button"
              onClick={onClick}
              className="relative mb-12 flex h-52 w-full items-center justify-center gap-8 rounded-8 bg-[#000000] text-16 font-600 text-basic-white"
            >
              <AppleIcon width={24} height={24} />
              Apple로 시작하기
            </button>
          )}
        />
      </section>
      <section className="flex flex-1 grow flex-col">
        <p className="mx-16 mt-40 border-t border-[#F3F3F3] pt-16 text-center text-12 font-500 text-basic-grey-400">
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

const LastLoginChip = () => {
  return (
    <div className="absolute -top-[5px] right-8 flex h-[26px] items-center justify-center rounded-full bg-[#181F29] px-8 text-10 font-600 text-basic-white">
      최근 로그인
    </div>
  );
};
