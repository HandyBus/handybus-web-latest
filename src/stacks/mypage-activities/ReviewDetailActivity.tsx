'use client';

import type { ActivityComponentType } from '@stackflow/react';
import ReviewDetail from '@/app/mypage/reviews/[reviewId]/ReviewDetail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  reviewId: string;
}

const ReviewDetailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { reviewId } = params;

  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReviewDetail reviewId={reviewId} />
      </div>
    </StackAppScreen>
  );
};

export default ReviewDetailActivity;
