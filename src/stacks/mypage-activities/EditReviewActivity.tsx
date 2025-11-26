'use client';

import type { ActivityComponentType } from '@stackflow/react';
import EditReview from '@/app/mypage/reviews/edit/[reviewId]/EditReview.content';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  reviewId: string;
}

const EditReviewActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { reviewId } = params;

  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EditReview reviewId={reviewId} />
      </div>
    </StackAppScreen>
  );
};

export default EditReviewActivity;
