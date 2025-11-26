'use client';

import type { ActivityComponentType } from '@stackflow/react';
import StackAppScreen from '@/stacks/StackAppScreen';
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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <WriteReview reservationId={reservationId} />
      </div>
    </StackAppScreen>
  );
};

export default WriteReviewActivity;
