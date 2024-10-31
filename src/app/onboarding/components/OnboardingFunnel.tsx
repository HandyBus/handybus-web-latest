'use client';

import useFunnel from '@/hooks/useFunnel';
import ProfileInfoStep from './steps/ProfileInfoStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ResidenceStep from './steps/ResidenceStep';
import ArtistStep from './steps/ArtistStep';

const ONBOARDING_STEPS = [
  '프로필 정보',
  '개인 정보',
  '거주지',
  '최애 가수',
] as const;

const OnboardingFunnel = () => {
  const { Funnel, Step, handleNextStep, handlePrevStep } =
    useFunnel(ONBOARDING_STEPS);

  return (
    <form noValidate className="w-full grow">
      <Funnel>
        <Step name="프로필 정보">
          <ProfileInfoStep handleNextStep={handleNextStep} />
        </Step>
        <Step name="개인 정보">
          <PersonalInfoStep
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
        <Step name="거주지">
          <ResidenceStep
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        </Step>
        <Step name="최애 가수">
          <ArtistStep handlePrevStep={handlePrevStep} />
        </Step>
      </Funnel>
    </form>
  );
};

export default OnboardingFunnel;
