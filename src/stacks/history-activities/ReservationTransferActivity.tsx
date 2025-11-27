'use client';

import type { ActivityComponentType } from '@stackflow/react';
import ReservationTransfer from '@/app/history/reservation/[reservationId]/reservation-transfer/ReservationTransfer.content';
import StackAppScreen from '@/stacks/StackAppScreen';

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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReservationTransfer reservationId={reservationId} />
      </div>
    </StackAppScreen>
  );
};

export default ReservationTransferActivity;
