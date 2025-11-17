'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Home from '@/app/(home)/Home.content';

const HomeActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Home />
      </div>
    </AppScreen>
  );
};

export default HomeActivity;
