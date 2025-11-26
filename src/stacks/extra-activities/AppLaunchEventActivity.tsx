'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AppLaunchEvent from '@/app/app-launch-event/AppLaunchEvent.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const AppLaunchEventActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AppLaunchEvent />
      </div>
    </StackAppScreen>
  );
};

export default AppLaunchEventActivity;
