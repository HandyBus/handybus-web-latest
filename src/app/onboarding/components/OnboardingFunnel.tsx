'use client';

import useFunnel from '@/hooks/useFunnel';
import ProfileInfoStep from './steps/ProfileInfoStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ResidenceStep from './steps/ResidenceStep';
import ArtistStep from './steps/ArtistStep';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from '../page';

const ONBOARDING_STEPS = [
  '프로필 정보',
  '개인 정보',
  '거주지',
  '최애 가수',
] as const;

const OnboardingFunnel = () => {
  const { Funnel, Step, handleNextStep, handlePrevStep } =
    useFunnel(ONBOARDING_STEPS);

  const { handleSubmit } = useFormContext<OnboardingFormValues>();

  const submitForm: SubmitHandler<OnboardingFormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      noValidate
      className="w-full grow"
    >
      <Funnel>
        <Step name="프로필 정보">
          <ProfileInfoStep handleNextStep={handleNextStep} />
        </Step>
        <Step name="개인 정보">
          <PersonalInfoStep
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
        <Step name="거주지">
          <ResidenceStep
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
        <Step name="최애 가수">
          <ArtistStep handlePrevStep={handlePrevStep} />
        </Step>
      </Funnel>
    </form>
  );
};

export default OnboardingFunnel;
