'use client';

import { FormProvider, useForm } from 'react-hook-form';
import OnboardingFunnel from './components/OnboardingFunnel';
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
} from './components/steps/PersonalInfoStep';
import { BigRegionsType } from '@/constants/regions';

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

  return (
    <div className="relative flex h-full w-full flex-col">
      <header className="flex h-[46px] w-full items-center px-28 py-12 text-14 font-600 text-grey-300">
        회원가입
      </header>
      <FormProvider {...methods}>
        <OnboardingFunnel />
      </FormProvider>
    </div>
  );
};

export default Onboarding;
