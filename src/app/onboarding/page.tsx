'use client';

import { FormProvider, useForm } from 'react-hook-form';
import OnboardingFunnel from './components/OnboardingFunnel';
import { BigRegionsType } from '@/constants/regions';
import { useState } from 'react';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import AppBar from '@/components/app-bar/AppBar';
import { useRouter } from 'next/navigation';
import { AgeType, ArtistType } from '@/types/client.types';

export interface OnboardingFormValues {
  nickname: string;
  profileImage: File | null;
  gender: '남성' | '여성';
  age: AgeType;
  bigRegion: BigRegionsType;
  smallRegion: string;
  regionID: number;
  favoriteArtists: ArtistType[];
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
      favoriteArtists: [],
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
