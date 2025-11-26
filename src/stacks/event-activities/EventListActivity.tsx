'use client';

import type { ActivityComponentType } from '@stackflow/react';
import EventList from '@/app/event/EventList.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const EventListActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EventList />
      </div>
    </StackAppScreen>
  );
};

export default EventListActivity;
