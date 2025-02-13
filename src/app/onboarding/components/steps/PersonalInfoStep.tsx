'use client';

import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import PersonalInfoContent from '@/components/onboarding-contents/PersonalInfoContent';
import { useFormContext } from 'react-hook-form';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const PersonalInfoStep = ({ handleNextStep, handlePrevStep }: Props) => {
  const { trigger } = useFormContext<OnboardingFormValues>();

  const handleCheckStep = async () => {
    const isStepValid = await trigger(['gender', 'age']);
    if (isStepValid) {
      handleNextStep();
    }
  };

  return (
    <OnboardingFrame
      handleSubmit={handleCheckStep}
      handlePrevStep={handlePrevStep}
      indicatorMax={4}
      indicatorValue={3}
    >
      <PersonalInfoContent />
    </OnboardingFrame>
  );
};

export default PersonalInfoStep;
