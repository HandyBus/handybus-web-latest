'use client';

import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const [isOpen, setIsOpen] = useState(
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? true : false,
  );
  const push = useRouter().push;

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={() => {
          push('https://mvp.handybus.co.kr/');
        }}
        title="서비스 준비 중이에요"
        description="더 나은 경험을 제공하기 위해 준비 중이에요. 현재는 기존 사이트에서만 예약이 가능합니다."
        buttonLabels={{ back: '닫기', confirm: '이동하기' }}
        variant="primary"
      />
    </>
  );
};

export default Page;
