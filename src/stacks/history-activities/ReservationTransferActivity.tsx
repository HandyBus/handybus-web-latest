'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ReservationTransfer from '@/app/history/reservation/[reservationId]/reservation-transfer/ReservationTransfer.content';

interface Params {
  reservationId: string;
}

const ReservationTransferActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { reservationId } = params;

  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReservationTransfer reservationId={reservationId} />
      </div>
    </AppScreen>
  );
};

export default ReservationTransferActivity;
