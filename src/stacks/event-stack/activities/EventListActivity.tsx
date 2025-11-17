'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import EventListContent from '@/app/event/EventListContent';

const EventListActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="flex h-full w-full flex-col">
        <EventListContent />
      </div>
    </AppScreen>
  );
};

export default EventListActivity;
