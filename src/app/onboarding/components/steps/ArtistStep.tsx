'use client';

import ArtistContent from '@/components/onboarding-contents/ArtistContent';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import { useFormContext } from 'react-hook-form';

interface Props {
  handlePrevStep: () => void;
  isLoading: boolean;
}

const ArtistStep = ({ handlePrevStep, isLoading }: Props) => {
  const { getValues } = useFormContext();
  const initialSelectedArtists = getValues('favoriteArtists');
  return (
    <OnboardingFrame
      handlePrevStep={handlePrevStep}
      disabled={isLoading}
      indicatorMax={5}
      indicatorValue={5}
      buttonType="submit"
      buttonText="핸디버스 만나러 가기"
    >
      <ArtistContent initialSelectedArtists={initialSelectedArtists} />
    </OnboardingFrame>
  );
};

export default ArtistStep;
