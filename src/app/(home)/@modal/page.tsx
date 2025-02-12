'use client';

import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import {
  getReservationCompleted,
  removeReservationCompleted,
} from '@/utils/localStorage';
import { useEffect, useState } from 'react';

const Page = () => {
  const handleOpenInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const [isOpen, setIsOpen] = useState(
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? true : false,
  );

  const [isReservationCompletedOpen, setIsReservationCompletedOpen] =
    useState(false);

  const handleIsReservationCompleted = () => {
    const isReservationCompleted = getReservationCompleted();
    if (isReservationCompleted) {
      setIsReservationCompletedOpen(true);
    }
  };

  const handleIsReservationCompletedClose = () => {
    setIsReservationCompletedOpen(false);
    removeReservationCompleted();
  };

  useEffect(() => {
    handleIsReservationCompleted();
  }, []);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={() => {
          handleOpenInNewTab('https://mvp.handybus.co.kr/');
        }}
        title="서비스 준비 중이에요"
        description="더 나은 경험을 제공하기 위해 준비 중이에요. 현재는 기존 사이트에서만 예약이 가능합니다."
        buttonLabels={{ back: '닫기', confirm: '이동하기' }}
        variant="primary"
      />
      <ConfirmModal
        isOpen={isReservationCompletedOpen}
        onClosed={handleIsReservationCompletedClose}
        onConfirm={() => {
          handleOpenInNewTab(process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL ?? '');
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

export default Page;
