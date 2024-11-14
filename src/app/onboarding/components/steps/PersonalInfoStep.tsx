'use client';

import Button from '@/components/buttons/button/Button';
import Indicator from '@/components/indicator/Indicator';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
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
    <>
      <PersonalInfoContent />
      <div className="absolute bottom-12 flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={5} value={3} />
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

export default PersonalInfoStep;
