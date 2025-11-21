'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Onboarding from '@/app/onboarding/Onboarding.content';

const OnboardingActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Onboarding />
      </div>
    </AppScreen>
  );
};

export default OnboardingActivity;
