'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AppLaunchEvent from '@/app/app-launch-event/AppLaunchEvent.content';

const AppLaunchEventActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AppLaunchEvent />
      </div>
    </AppScreen>
  );
};

export default AppLaunchEventActivity;
