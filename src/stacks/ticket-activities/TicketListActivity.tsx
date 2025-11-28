'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import TicketList from '@/app/ticket/TicketList.content';

const TicketListActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <TicketList />
      </div>
    </AppScreen>
  );
};

export default TicketListActivity;
