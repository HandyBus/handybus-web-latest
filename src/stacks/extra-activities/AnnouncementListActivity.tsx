'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AnnouncementList from '@/app/announcements/AnnouncementList.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const AnnouncementListActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AnnouncementList />
      </div>
    </StackAppScreen>
  );
};

export default AnnouncementListActivity;
