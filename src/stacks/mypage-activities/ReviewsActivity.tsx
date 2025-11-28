'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Reviews from '@/app/mypage/reviews/Reviews.content';

const ReviewsActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Reviews />
      </div>
    </AppScreen>
  );
};

export default ReviewsActivity;
