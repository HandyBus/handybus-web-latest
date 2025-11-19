'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ReviewComplete from '@/app/mypage/reviews/write/[reservationId]/complete/ReviewComplete.content';

const ReviewCompleteActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReviewComplete />
      </div>
    </AppScreen>
  );
};

export default ReviewCompleteActivity;
