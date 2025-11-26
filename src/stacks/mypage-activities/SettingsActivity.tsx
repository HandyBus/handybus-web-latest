'use client';

import type { ActivityComponentType } from '@stackflow/react';
import Settings from '@/app/mypage/settings/Settings.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const SettingsActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Settings />
      </div>
    </StackAppScreen>
  );
};

export default SettingsActivity;
