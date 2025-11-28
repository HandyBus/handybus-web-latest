'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AcceptReservationTransfer from '@/app/accept-reservation-transfer/[token]/AcceptReservationTransfer.content.tsx';

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
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AcceptReservationTransfer token={token} />
      </div>
    </AppScreen>
  );
};

export default AcceptReservationTransferActivity;
