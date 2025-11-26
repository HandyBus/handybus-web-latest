'use client';

import type { ActivityComponentType } from '@stackflow/react';
import ReservationDetail from '@/app/history/reservation/[reservationId]/ReservationDetail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  reservationId: string;
}

const ReservationDetailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { reservationId } = params;

  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReservationDetail reservationId={reservationId} />
      </div>
    </StackAppScreen>
  );
};

export default ReservationDetailActivity;
