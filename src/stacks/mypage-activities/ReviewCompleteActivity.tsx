'use client';

import type { ActivityComponentType } from '@stackflow/react';
import ReviewComplete from '@/app/mypage/reviews/write/[reservationId]/complete/ReviewComplete.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const ReviewCompleteActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReviewComplete />
      </div>
    </StackAppScreen>
  );
};

export default ReviewCompleteActivity;
