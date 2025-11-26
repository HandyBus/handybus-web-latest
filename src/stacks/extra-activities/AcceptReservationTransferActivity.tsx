'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AcceptReservationTransfer from '@/app/accept-reservation-transfer/[token]/AcceptReservationTransfer.content.tsx';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  token: string;
}

const AcceptReservationTransferActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { token } = params;
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AcceptReservationTransfer token={token} />
      </div>
    </StackAppScreen>
  );
};

export default AcceptReservationTransferActivity;
