'use client';

import type { ActivityComponentType } from '@stackflow/react';
import EventListFromHome from '@/app/event-from-home/EventListFromHome.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const EventListFromHomeActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EventListFromHome />
      </div>
    </StackAppScreen>
  );
};

export default EventListFromHomeActivity;
