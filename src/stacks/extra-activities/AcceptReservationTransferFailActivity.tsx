'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AcceptReservationTransferFail from '@/app/accept-reservation-transfer/[token]/fail/AcceptReservationTransferFail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AcceptReservationTransferFail
          token={token}
          receiverPhoneNumber={receiverPhoneNumber}
        />
      </div>
    </StackAppScreen>
  );
};

export default AcceptReservationTransferFailActivity;
