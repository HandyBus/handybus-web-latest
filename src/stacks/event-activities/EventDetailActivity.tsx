'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import EventDetailContent from '@/app/event/[eventId]/EventDetailContent';

interface Params {
  eventId: string;
}

const EventDetailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { eventId } = params;

  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EventDetailContent eventId={eventId} />
      </div>
    </AppScreen>
  );
};

export default EventDetailActivity;
