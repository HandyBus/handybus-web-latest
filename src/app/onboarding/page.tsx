'use client';

import { FormProvider, useForm } from 'react-hook-form';
import OnboardingFunnel from './components/OnboardingFunnel';
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
} from './components/steps/PersonalInfoStep';
import { BigRegionsType } from '@/constants/regions';
import { useState } from 'react';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import AppBar from '@/components/app-bar/AppBar';
import { useRouter } from 'next/navigation';

export interface OnboardingFormValues {
  nickname: string;
  profileImage: File | null;
  gender: (typeof GENDER_OPTIONS)[number];
  age: (typeof AGE_OPTIONS)[number];
  bigRegion: BigRegionsType;
  smallRegion: string;
  artists: string[];
}

const Onboarding = () => {
  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      nickname: '',
      profileImage: null,
      gender: undefined,
      age: undefined,
      bigRegion: undefined,
      smallRegion: undefined,
      artists: [],
    },
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative flex h-full w-full flex-col">
        <AppBar handleBack={() => setIsOpen(true)} />
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
