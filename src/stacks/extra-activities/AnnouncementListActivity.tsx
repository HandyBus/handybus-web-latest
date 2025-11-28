'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AnnouncementList from '@/app/announcements/AnnouncementList.content';

const AnnouncementListActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AnnouncementList />
      </div>
    </AppScreen>
  );
};

export default AnnouncementListActivity;
