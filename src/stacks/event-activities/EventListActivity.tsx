'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import EventList from '@/app/event/EventList.content';

const EventListActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EventList />
      </div>
    </AppScreen>
  );
};

export default EventListActivity;
