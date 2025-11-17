'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ReviewDetail from '@/app/mypage/reviews/[reviewId]/ReviewDetail.content';

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
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <ReviewDetail reviewId={reviewId} />
      </div>
    </AppScreen>
  );
};

export default ReviewDetailActivity;
