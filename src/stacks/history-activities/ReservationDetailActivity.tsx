'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ReservationDetail from '@/app/history/reservation/[reservationId]/ReservationDetail.content';

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
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReservationDetail reservationId={reservationId} />
      </div>
    </AppScreen>
  );
};

export default ReservationDetailActivity;
