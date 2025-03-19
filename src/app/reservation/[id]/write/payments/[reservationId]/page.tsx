'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import LogoLargeIcon from 'public/icons/logo-large.svg';
import { useEffect } from 'react';
import { setReservationCompleted } from '@/utils/localStorage';

const PaymentsCompleted = () => {
  usePreventScroll();

  useEffect(() => {
    setReservationCompleted();
  }, []);

  return (
    <>
      <main className="flex grow flex-col items-center justify-center gap-24">
        <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
        <section>
          <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-basic-black">
            결제가 완료되었습니다!
          </h1>
          <p className="flex justify-center text-16 font-500 leading-[25.6px] text-basic-grey-500">
            마이페이지에서 예약 내역을 확인하실 수 있습니다.
          </p>
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 p-16">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default PaymentsCompleted;
