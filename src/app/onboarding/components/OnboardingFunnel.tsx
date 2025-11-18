'use client';

import { setOnboardingStatusComplete } from '@/utils/handleToken.util';
import PhoneNumberStep from './steps/PhoneNumberStep';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FORM_DEFAULT_VALUES } from '@/components/onboarding-contents/formValidation.const';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.type';
import { useFlow } from '@/stacks';

interface Props {
  isOnboardingComplete: boolean;
}

const OnboardingFunnel = ({ isOnboardingComplete }: Props) => {
  const flow = useFlow();

  useEffect(() => {
    if (isOnboardingComplete) {
      setOnboardingStatusComplete();
      flow.replace('Home', {}, { animate: false });
    }
  }, [isOnboardingComplete]);

  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      ...FORM_DEFAULT_VALUES,
    },
  });

  return (
    <FormProvider {...methods}>
      <main className="relative flex w-full grow flex-col">
        <PhoneNumberStep />
      </main>
    </FormProvider>
  );
};

export default OnboardingFunnel;
