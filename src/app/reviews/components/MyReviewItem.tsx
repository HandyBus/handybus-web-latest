'use client';

import ReviewItem from './ReviewItem';
import { convertStaticToReviewEntity } from '../convertStaticToReviewEntity.util';
import { STATIC_REVIEWS } from '../review.const';

const MyReviewItem = () => {
  const mockReview = convertStaticToReviewEntity(STATIC_REVIEWS[0]);
  return <ReviewItem review={mockReview} isMyReview={true} />;
};

export default MyReviewItem;
