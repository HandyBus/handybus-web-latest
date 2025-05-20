'use client';

import { convertStaticToReviewEntity } from '../convertStaticToReviewEntity.util';
import { STATIC_REVIEWS } from '../review.const';
import ReviewItem from './ReviewItem';

const MyReviewItem = () => {
  const mockReview = convertStaticToReviewEntity(STATIC_REVIEWS[0]);
  return <ReviewItem review={mockReview} isMyReview={true} />;
};

export default MyReviewItem;
