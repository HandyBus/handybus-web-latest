'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import WriteReview from '@/app/mypage/reviews/write/[reservationId]/WriteReview.content';

interface Params {
  reservationId: string;
}

const WriteReviewActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { reservationId } = params;

  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <WriteReview reservationId={reservationId} />
      </div>
    </AppScreen>
  );
};

export default WriteReviewActivity;
