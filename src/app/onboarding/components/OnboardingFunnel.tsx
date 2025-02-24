'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AgreementStep from './steps/AgreementStep';
import { removeIsOnboarding, setIsLoggedIn } from '@/utils/handleToken.util';
import { OnboardingProgress } from '@/utils/parseProgress.util';

interface Props {
  onboardingProgress: OnboardingProgress;
}

const OnboardingFunnel = ({ onboardingProgress }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (onboardingProgress === 'ONBOARDING_COMPLETE') {
      removeIsOnboarding();
      setIsLoggedIn();
      router.push('/');
    }
  }, [onboardingProgress]);

  return <AgreementStep />;
};

export default OnboardingFunnel;
