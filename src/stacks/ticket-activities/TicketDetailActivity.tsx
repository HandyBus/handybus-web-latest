'use client';

import type { ActivityComponentType } from '@stackflow/react';
import TicketDetail from '@/app/ticket/[reservationId]/TicketDetail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  reservationId: string;
}

const TicketDetailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { reservationId } = params;

  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <TicketDetail reservationId={reservationId} />
      </div>
    </StackAppScreen>
  );
};

export default TicketDetailActivity;
