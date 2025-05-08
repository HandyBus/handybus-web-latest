'use client';

import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.type';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import PersonalInfoContent from '@/components/onboarding-contents/PersonalInfoContent';
import { useFormContext } from 'react-hook-form';

interface Props {
  triggerSubmitForm: () => void;
  disabled: boolean;
}

const PersonalInfoStep = ({ triggerSubmitForm, disabled }: Props) => {
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
      buttonText="핸디버스 만나러 가기"
      disabled={disabled}
    >
      <PersonalInfoContent />
    </OnboardingFrame>
  );
};

export default PersonalInfoStep;
