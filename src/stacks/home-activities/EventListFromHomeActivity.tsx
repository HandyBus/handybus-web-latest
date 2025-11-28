'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import EventListFromHome from '@/app/event-from-home/EventListFromHome.content';

const EventListFromHomeActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EventListFromHome />
      </div>
    </AppScreen>
  );
};

export default EventListFromHomeActivity;
