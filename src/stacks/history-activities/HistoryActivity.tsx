'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import History from '@/app/history/History.content';

interface Params {
  type: 'reservation' | 'demand';
}

const HistoryActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { type } = params;
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <History type={type} />
      </div>
    </AppScreen>
  );
};

export default HistoryActivity;
