'use client';

import KakaoIcon from 'public/icons/kakao.svg';
import NaverIcon from 'public/icons/naver.svg';
import { OAUTH } from '@/constants/oauth';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useEffect, useState } from 'react';
import {
  getLastLogin,
  removeRedirectUrl,
  setLastLogin,
  setRedirectUrl,
} from '@/utils/localStorage';
import AppleLogin from 'react-apple-login';
import AppleIcon from './icons/apple.svg';
import Header from '@/components/header/Header';
import { handleExternalLink } from '@/utils/externalLink.util';
import { getIsAppFromUserAgent } from '@/utils/environment.util';
import { useFlow } from '@/stacks';

interface Props {
  redirectUrl?: string;
}

const Login = ({ redirectUrl }: Props) => {
  usePreventScroll();

  useEffect(() => {
    if (redirectUrl) {
      setRedirectUrl(redirectUrl);
    } else {
      removeRedirectUrl();
    }
  }, [redirectUrl]);

  const flow = useFlow();

  const isApp = getIsAppFromUserAgent();
  const handleKakaoLogin = () => {
    setLastLogin('kakao');
    handleExternalLink(OAUTH.kakao(isApp));
  };
  const handleNaverLogin = () => {
    setLastLogin('naver');
    handleExternalLink(OAUTH.naver(isApp));
  };

  const [lastLoginState, setLastLoginState] = useState<
    'kakao' | 'naver' | 'apple' | null
  >(null);

  useEffect(() => {
    const newLastLogin = getLastLogin();
    if (newLastLogin) {
      setLastLoginState(newLastLogin);
    }
  }, []);

  const appleRedirectUrl = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI;
  const appleClientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;

  if (!appleRedirectUrl || !appleClientId) {
    return null;
  }

  return (
    <main className="flex grow flex-col">
      <Header />
      <section className="-my-8 flex flex-1 grow flex-col items-center justify-center gap-16">
        <div className="min-h-64" />
        <p className="text-center text-20 font-600 text-[#181F29]">
          팬들이 만드는
          <br />
          설렘 가득한 이동 경험
          <br />
          <span className="text-brand-primary-400">핸디버스</span>
        </p>
      </section>
      <section className="p-16">
        <p className="mb-16 text-center text-16 font-600 text-[#181F29]">
          원하는 행사까지 편하게 이동하세요.
        </p>
        <button
          onClick={handleKakaoLogin}
          type="button"
          className="relative mb-12 flex h-52 w-full items-center justify-center gap-8 rounded-8 bg-[#FEE500] text-16 font-600 text-basic-black/85"
        >
          <KakaoIcon />
          카카오로 시작하기
          {lastLoginState === 'kakao' && <LastLoginChip />}
        </button>
        <button
          onClick={handleNaverLogin}
          type="button"
          className="relative mb-12 flex h-52 w-full items-center justify-center gap-8 rounded-8 bg-[#03C75A] text-16 font-600 text-basic-white"
        >
          <NaverIcon />
          네이버로 시작하기
          {lastLoginState === 'naver' && <LastLoginChip />}
        </button>
        <AppleLogin
          clientId={appleClientId}
          redirectURI={appleRedirectUrl}
          responseType={'code'}
          responseMode={'query'}
          usePopup={false}
          render={({ onClick }) => (
            <button
              type="button"
              onClick={() => {
                setLastLogin('apple');
                onClick();
              }}
              className="relative mb-12 flex h-52 w-full items-center justify-center gap-8 rounded-8 bg-[#000000] text-16 font-600 text-basic-white"
            >
              <AppleIcon width={24} height={24} />
              Apple로 시작하기
              {lastLoginState === 'apple' && <LastLoginChip />}
            </button>
          )}
        />
      </section>
      <section className="flex flex-1 grow flex-col">
        <p className="mx-16 mt-40 border-t border-[#F3F3F3] pt-16 text-center text-12 font-500 text-basic-grey-400">
          로그인은{' '}
          <button
            type="button"
            onClick={() => flow.push('PrivacyPolicy', {})}
            className="text-left underline"
          >
            개인정보처리방침
          </button>{' '}
          및{' '}
          <button
            type="button"
            onClick={() => flow.push('TermsOfService', {})}
            className="text-left underline"
          >
            서비스 이용 약관
          </button>{' '}
          에 동의하는 것을
          <br />
          의미하며, 서비스 이용을 위해 실명, 전화번호, 성별, 연령대를
          수집합니다.
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
