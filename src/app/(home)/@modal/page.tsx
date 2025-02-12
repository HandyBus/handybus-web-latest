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
