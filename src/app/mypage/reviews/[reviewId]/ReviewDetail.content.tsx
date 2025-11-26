'use client';

import ReviewListWithMyReview from './components/ReviewListWithMyReview';
import Header from '@/components/header/Header';

interface Props {
  reviewId: string;
}

const ReviewDetail = ({ reviewId }: Props) => {
  return (
    <>
      <Header pageName="후기 정보" />
      <main>
        <ReviewListWithMyReview reviewId={reviewId} />
      </main>
    </>
  );
};

export default ReviewDetail;
