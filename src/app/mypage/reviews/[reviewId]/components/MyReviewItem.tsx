'use client';

import { useGetUserReviews } from '@/services/review.service';
import ReviewItem from './ReviewItem';

interface Props {
  reviewId: string;
}

const MyReviewItem = ({ reviewId }: Props) => {
  const { data: review } = useGetUserReviews();
  const targetReview = review?.find((review) => review.reviewId === reviewId);

  if (!targetReview) return null;
  return <ReviewItem review={targetReview} isMyReview={true} />;
};

export default MyReviewItem;
