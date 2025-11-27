'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AcceptReservationTransferSuccess from '@/app/accept-reservation-transfer/[token]/success/AcceptReservationTransferSuccess.content';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  status: 'accepted' | 'already-accepted';
}

const AcceptReservationTransferSuccessActivity: ActivityComponentType<
  Params
> = ({ params }: { params: Params }) => {
  const { status } = params;
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AcceptReservationTransferSuccess status={status} />
      </div>
    </StackAppScreen>
  );
};

export default AcceptReservationTransferSuccessActivity;
