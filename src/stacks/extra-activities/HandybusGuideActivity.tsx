'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import HandybusGuide from '@/app/help/handybus-guide/HandybusGuide.content';

const HandybusGuideActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <HandybusGuide />
      </div>
    </AppScreen>
  );
};

export default HandybusGuideActivity;
