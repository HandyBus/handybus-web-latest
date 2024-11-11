'use client';

import Button from '@/components/buttons/button/Button';
import Indicator from '@/components/indicator/Indicator';
import { ERROR_MESSAGES } from '@/components/onboarding-contents/formValidation.contants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
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
    <>
      <ResidenceContent />
      <div className="absolute bottom-12 flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={4} value={3} />
        </div>
        <div className="w-full px-32 pb-4 pt-8">
          <Button type="button" onClick={handleCheckStep}>
            다음으로
          </Button>
        </div>
        <button
          type="button"
          onClick={handlePrevStep}
          className="text-center text-12 text-grey-400 underline underline-offset-2"
        >
          이전으로
        </button>
      </div>
    </>
  );
};

export default ResidenceStep;
