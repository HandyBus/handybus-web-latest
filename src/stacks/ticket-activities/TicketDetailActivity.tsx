'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import TicketDetail from '@/app/ticket/[reservationId]/TicketDetail.content';

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
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <TicketDetail reservationId={reservationId} />
      </div>
    </AppScreen>
  );
};

export default TicketDetailActivity;
