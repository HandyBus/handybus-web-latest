'use client';

import type { ActivityComponentType } from '@stackflow/react';
import TicketList from '@/app/ticket/TicketList.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const TicketListActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <TicketList />
      </div>
    </StackAppScreen>
  );
};

export default TicketListActivity;
