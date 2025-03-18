'use client';

import Button from '@/components/buttons/button/Button';
import LogoLargeIcon from 'public/icons/logo-large.svg';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
  searchParams: {
    code?: string;
    userExceptionMessage?: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const [code, setCode] = useState<string | undefined>(searchParams.code);
  const [userExceptionMessage, setUserExceptionMessage] = useState<
    string | undefined
  >(searchParams.userExceptionMessage);

  useEffect(() => {
    setCode(searchParams.code);
    setUserExceptionMessage(searchParams.userExceptionMessage);
  }, [searchParams.code, searchParams.userExceptionMessage]);

  if (code === '402') {
    return (
      <main className="flex grow flex-col items-center justify-center gap-24">
        <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
        <section className="p-16">
          <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-basic-black">
            결제 중 문제가 생겼습니다.
          </h1>
          <p className="flex justify-center text-16 font-500 leading-[25.6px] text-brand-grey-500">
            {userExceptionMessage}
          </p>
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 p-16">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (code === '409') {
    return (
      <main className="flex grow flex-col items-center justify-center gap-24">
        <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
        <section>
          <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-basic-black">
            이미 완료된 예약결제입니다.
          </h1>
          <p className="flex justify-center text-16 font-500 leading-[25.6px] text-brand-grey-500">
            내 예약 페이지에서 확인해주세요.
          </p>
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 p-16">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex grow flex-col items-center justify-center gap-24">
      <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
      <section>
        <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-basic-black">
          결제 중 문제가 생겼습니다.
        </h1>
        <p className="flex justify-center text-16 font-500 leading-[25.6px] text-brand-grey-500">
          마이페이지에서 결제 내역을 확인한 후 다시 시도해주세요.
        </p>
      </section>
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 p-16">
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </main>
  );
};

export default Page;
