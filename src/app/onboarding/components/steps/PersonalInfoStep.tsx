'use client';

import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import PersonalInfoContent from '@/components/onboarding-contents/PersonalInfoContent';
import { useFormContext } from 'react-hook-form';

interface Props {
  handlePrevStep: () => void;
  triggerSubmitForm: () => void;
  disabled: boolean;
  isAgreementComplete: boolean;
}

const PersonalInfoStep = ({
  handlePrevStep,
  triggerSubmitForm,
  disabled,
  isAgreementComplete,
}: Props) => {
  const { trigger } = useFormContext<OnboardingFormValues>();

  const handleCheckStep = async () => {
    const isStepValid = await trigger(['gender', 'age']);
    if (isStepValid) {
      triggerSubmitForm();
    }
  };

  return (
    <OnboardingFrame
      handleSubmit={handleCheckStep}
      handlePrevStep={isAgreementComplete ? handlePrevStep : undefined}
      buttonText="핸디버스 만나러 가기"
      disabled={disabled}
    >
      <PersonalInfoContent />
    </OnboardingFrame>
  );
};

export default PersonalInfoStep;
