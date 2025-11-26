'use client';

import type { ActivityComponentType } from '@stackflow/react';
import History, { HistoryTabType } from '@/app/history/History.content';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  type: HistoryTabType;
}

const HistoryActivity: ActivityComponentType<Params> = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <History />
      </div>
    </StackAppScreen>
  );
};

export default HistoryActivity;
