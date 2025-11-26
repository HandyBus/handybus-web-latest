'use client';

import type { ActivityComponentType } from '@stackflow/react';
import Onboarding from '@/app/onboarding/Onboarding.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const OnboardingActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Onboarding />
      </div>
    </StackAppScreen>
  );
};

export default OnboardingActivity;
