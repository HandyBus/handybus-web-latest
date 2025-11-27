'use client';

import type { ActivityComponentType } from '@stackflow/react';
import ReservationTransferSuccess from '@/app/history/reservation/[reservationId]/reservation-transfer/success/ReservationTransferSuccess.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const ReservationTransferSuccessActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReservationTransferSuccess />
      </div>
    </StackAppScreen>
  );
};

export default ReservationTransferSuccessActivity;
