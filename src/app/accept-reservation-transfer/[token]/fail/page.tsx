'use client';

import Header from '@/components/header/Header';
import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';
import { logoutWithLoginRedirect } from '@/utils/handleToken.util';

interface Props {
  params: {
    token: string;
  };
}

const Page = ({ params }: Props) => {
  const { token } = params;
  const router = useRouter();
  const redirectUrl = `/accept-reservation-transfer/${token}`;
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <section className="mt-96 flex flex-col items-center">
          <h1 className="pb-4 text-22 font-700 leading-[140%]">
            선물 받은 계정이 아니에요
          </h1>
          <p className="pb-24 text-16 font-500 leading-[160%] text-basic-grey-600">
            아래 연락처로 가입된 계정으로 로그인해주세요.
          </p>
          <div className="flex h-40 w-288 items-center justify-center rounded-8 bg-basic-grey-50 p-8 text-18 font-600 text-basic-grey-700">
            010-1234-1232
          </div>
        </section>
        <div className="flex-1" />
        <div className="flex flex-col gap-8 p-16">
          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={() => logoutWithLoginRedirect(redirectUrl)}
          >
            로그아웃
          </Button>
          <Button
            type="button"
            variant="text"
            size="large"
            onClick={() => router.push('/')}
          >
            닫기
          </Button>
        </div>
      </main>
    </>
  );
};

export default Page;
