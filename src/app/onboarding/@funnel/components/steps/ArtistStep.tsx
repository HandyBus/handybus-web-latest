'use client';

import ArtistContent from '@/components/onboarding-contents/ArtistContent';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';

interface Props {
  handlePrevStep: () => void;
  isLoading: boolean;
}

const ArtistStep = ({ handlePrevStep, isLoading }: Props) => {
  return (
    <OnboardingFrame
      handlePrevStep={handlePrevStep}
      disabled={isLoading}
      indicatorMax={5}
      indicatorValue={5}
      buttonType="submit"
      buttonText="핸디버스 만나러 가기"
    >
      <ArtistContent />
    </OnboardingFrame>
  );
};

export default ArtistStep;
