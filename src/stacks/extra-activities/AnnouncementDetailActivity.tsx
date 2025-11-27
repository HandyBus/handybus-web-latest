'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AnnouncementDetail from '@/app/announcements/[id]/AnnouncementDetail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AnnouncementDetail id={id} />
      </div>
    </StackAppScreen>
  );
};

export default AnnouncementDetailActivity;
