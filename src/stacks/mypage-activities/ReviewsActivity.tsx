'use client';

import type { ActivityComponentType } from '@stackflow/react';
import Reviews from '@/app/mypage/reviews/Reviews.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const ReviewsActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Reviews />
      </div>
    </StackAppScreen>
  );
};

export default ReviewsActivity;
