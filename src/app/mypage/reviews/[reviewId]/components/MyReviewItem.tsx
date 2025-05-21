'use client';

import { useGetReview } from '@/services/review.service';
import ReviewItem from './ReviewItem';

interface Props {
  reviewId: string;
}

const MyReviewItem = ({ reviewId }: Props) => {
  const { data } = useGetReview(reviewId);

  if (!data) return null;
  return <ReviewItem review={data} isMyReview={true} />;
};

export default MyReviewItem;
