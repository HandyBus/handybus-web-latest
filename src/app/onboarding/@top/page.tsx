'use client';

import logout from '@/app/actions/logout.action';
import AppBar from '@/components/app-bar/AppBar';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import { useState } from 'react';

const OnboardingTop = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppBar handleBack={() => setIsOpen(true)}>회원가입</AppBar>
      <ConfirmModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={() => logout()}
        title="회원가입을 취소하시겠습니까?"
        buttonLabels={{ back: '돌아가기', confirm: '취소하기' }}
      />
    </>
  );
};

export default OnboardingTop;
