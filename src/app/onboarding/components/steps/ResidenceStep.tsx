'use client';

import { ERROR_MESSAGES } from '@/components/onboarding-contents/formValidation.constants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import ResidenceContent from '@/components/onboarding-contents/ResidenceContent';
import { useFormContext } from 'react-hook-form';

interface Props {
  handlePrevStep: () => void;
  isLoading: boolean;
}

const ResidenceStep = ({ handlePrevStep, isLoading }: Props) => {
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
    const form = document.getElementById('onboarding-form') as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <OnboardingFrame
      handleSubmit={handleCheckStep}
      handlePrevStep={handlePrevStep}
      indicatorMax={4}
      indicatorValue={4}
      disabled={isLoading}
      buttonType="submit"
      buttonText="핸디버스 만나러 가기"
    >
      <ResidenceContent />
    </OnboardingFrame>
  );
};

export default ResidenceStep;
