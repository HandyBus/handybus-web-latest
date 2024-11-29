'use client';

import { ERROR_MESSAGES } from '@/components/onboarding-contents/formValidation.constants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import ResidenceContent from '@/components/onboarding-contents/ResidenceContent';
import { useFormContext } from 'react-hook-form';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const ResidenceStep = ({ handleNextStep, handlePrevStep }: Props) => {
  const { getValues, setError, clearErrors } =
    useFormContext<OnboardingFormValues>();

  const handleCheckStep = () => {
    const isStepValid = getValues(['bigRegion', 'smallRegion']);
    if (!(isStepValid[0] && isStepValid[1])) {
      setError('bigRegion', {
        type: 'required',
        message: ERROR_MESSAGES.region.required,
      });
      return;
    }

    clearErrors('bigRegion');
    handleNextStep();
  };

  return (
    <OnboardingFrame
      handleSubmit={handleCheckStep}
      handlePrevStep={handlePrevStep}
      indicatorMax={5}
      indicatorValue={4}
    >
      <ResidenceContent />
    </OnboardingFrame>
  );
};

export default ResidenceStep;
