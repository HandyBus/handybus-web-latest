'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AcceptReservationTransferFail from '@/app/accept-reservation-transfer/[token]/fail/AcceptReservationTransferFail.content';

interface Params {
  token: string;
  receiverPhoneNumber: string;
}

const AcceptReservationTransferFailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { token, receiverPhoneNumber } = params;
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AcceptReservationTransferFail
          token={token}
          receiverPhoneNumber={receiverPhoneNumber}
        />
      </div>
    </AppScreen>
  );
};

export default AcceptReservationTransferFailActivity;
