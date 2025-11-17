'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import HomeContent from '@/app/(home)/HomeContent';

const HomeActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <HomeContent />
      </div>
    </AppScreen>
  );
};

export default HomeActivity;
