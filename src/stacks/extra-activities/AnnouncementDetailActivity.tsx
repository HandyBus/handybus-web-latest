'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AnnouncementDetail from '@/app/announcements/[id]/AnnouncementDetail.content';

interface Params {
  id: string;
}

const AnnouncementDetailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { id } = params;

  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AnnouncementDetail id={id} />
      </div>
    </AppScreen>
  );
};

export default AnnouncementDetailActivity;
