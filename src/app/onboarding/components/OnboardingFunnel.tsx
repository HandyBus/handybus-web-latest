'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AgreementStep from './steps/AgreementStep';
import { setOnboardingStatusComplete } from '@/utils/handleToken.util';

interface Props {
  isOnboardingComplete: boolean;
}

const OnboardingFunnel = ({ isOnboardingComplete }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (isOnboardingComplete) {
      setOnboardingStatusComplete();
      router.replace('/');
    }
  }, [isOnboardingComplete]);

  return <AgreementStep />;
};

export default OnboardingFunnel;
