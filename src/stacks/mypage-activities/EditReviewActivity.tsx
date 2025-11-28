'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import EditReview from '@/app/mypage/reviews/edit/[reviewId]/EditReview.content';

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
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <EditReview reviewId={reviewId} />
      </div>
    </AppScreen>
  );
};

export default EditReviewActivity;
