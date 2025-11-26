'use client';

import type { ActivityComponentType } from '@stackflow/react';
import EventDetail from '@/app/event/[eventId]/EventDetail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EventDetail eventId={eventId} />
      </div>
    </StackAppScreen>
  );
};

export default EventDetailActivity;
