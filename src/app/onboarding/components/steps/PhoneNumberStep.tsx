'use client';

import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import PhoneNumberContent from '@/components/onboarding-contents/PhoneNumberContent';

interface Props {
  handleNextStep: () => void;
}

const PhoneNumberStep = ({ handleNextStep }: Props) => {
  return (
    <OnboardingFrame>
      <PhoneNumberContent
        title={
          <>
            빠른 가입을 위해
            <br />
            본인 인증을 진행할게요
          </>
        }
        handleNextStep={handleNextStep}
      />
    </OnboardingFrame>
  );
};

export default PhoneNumberStep;
