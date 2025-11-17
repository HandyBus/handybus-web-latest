'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import History from '@/app/history/History.content';

const HistoryActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <History />
      </div>
    </AppScreen>
  );
};

export default HistoryActivity;
