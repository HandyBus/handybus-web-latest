'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ReservationTransferSuccess from '@/app/history/reservation/[reservationId]/reservation-transfer/success/ReservationTransferSuccess.content';

const ReservationTransferSuccessActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReservationTransferSuccess />
      </div>
    </AppScreen>
  );
};

export default ReservationTransferSuccessActivity;
