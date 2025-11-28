'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import History, { HistoryTabType } from '@/app/history/History.content';

interface Params {
  type: HistoryTabType;
}

const HistoryActivity: ActivityComponentType<Params> = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <History />
      </div>
    </AppScreen>
  );
};

export default HistoryActivity;
