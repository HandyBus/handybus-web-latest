'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Settings from '@/app/mypage/settings/Settings.content';

const SettingsActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Settings />
      </div>
    </AppScreen>
  );
};

export default SettingsActivity;
