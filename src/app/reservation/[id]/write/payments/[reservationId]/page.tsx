'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import LogoLargeIcon from 'public/icons/logo-large.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import { FEEDBACK_FORM_URL } from '@/constants/common';

const PaymentsCompleted = () => {
  const [isOpen, setIsOpen] = useState(true);
  const push = useRouter().push;

  usePreventScroll();
  return (
    <>
      <main className="flex grow flex-col items-center justify-center gap-24">
        <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
        <section>
          <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-black">
            결제가 완료되었습니다!
          </h1>
          <p className="flex justify-center text-16 font-500 leading-[25.6px] text-grey-500">
            마이페이지에서 예약 내역을 확인하실 수 있습니다.
          </p>
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 p-16">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </main>
      <ConfirmModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={() => {
          push(FEEDBACK_FORM_URL);
        }}
        title="의견을 남겨주세요!"
        description="핸디버스에서 예약은 어떠셨나요? 
여러분의 소중한 의견을 들려주세요!"
        buttonLabels={{ back: '닫기', confirm: '의견 남기기' }}
        variant="primary"
      />
    </>
  );
};

export default PaymentsCompleted;
