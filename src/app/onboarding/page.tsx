'use client';

import { FormProvider, useForm } from 'react-hook-form';
import OnboardingFunnel from './components/OnboardingFunnel';

const Onboarding = () => {
  const methods = useForm();

  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex h-[46px] w-full items-center px-16 py-12 text-14 font-600 text-grey-300">
        회원가입
      </header>
      <FormProvider {...methods}>
        <OnboardingFunnel />
      </FormProvider>
    </div>
  );
};

export default Onboarding;
