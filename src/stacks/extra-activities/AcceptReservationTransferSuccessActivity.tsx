'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AcceptReservationTransferSuccess from '@/app/accept-reservation-transfer/[token]/success/AcceptReservationTransferSuccess.content';

interface Params {
  status: 'accepted' | 'already-accepted';
}

const AcceptReservationTransferSuccessActivity: ActivityComponentType<
  Params
> = ({ params }: { params: Params }) => {
  const { status } = params;
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AcceptReservationTransferSuccess status={status} />
      </div>
    </AppScreen>
  );
};

export default AcceptReservationTransferSuccessActivity;
