'use client';

import { FormProvider, useForm } from 'react-hook-form';
import OnboardingFunnel from './components/OnboardingFunnel';
import { useState } from 'react';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import AppBar from '@/components/app-bar/AppBar';
import { useRouter } from 'next/navigation';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { FORM_DEFAULT_VALUES } from '@/components/onboarding-contents/formValidation.contants';

const Onboarding = () => {
  const methods = useForm<OnboardingFormValues>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative flex h-full w-full grow flex-col">
        <AppBar handleBack={() => setIsOpen(true)}>회원가입</AppBar>
        <FormProvider {...methods}>
          <OnboardingFunnel />
        </FormProvider>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        onConfirm={() => router.push('/')}
        title="회원가입을 취소하시겠습니까?"
        buttonLabels={{ back: '돌아가기', confirm: '취소하기' }}
      />
    </>
  );
};

export default Onboarding;
