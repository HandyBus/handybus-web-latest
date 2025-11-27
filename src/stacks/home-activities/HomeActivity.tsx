'use client';

import type { ActivityComponentType } from '@stackflow/react';
import Home from '@/app/(home)/Home.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const HomeActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Home />
      </div>
    </StackAppScreen>
  );
};

export default HomeActivity;
