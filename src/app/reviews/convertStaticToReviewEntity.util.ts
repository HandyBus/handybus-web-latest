import { ReviewsViewEntity } from '@/types/review.type';
import { STATIC_REVIEWS } from './review.const';

export const convertStaticToReviewEntity = (
  staticReview: (typeof STATIC_REVIEWS)[0],
): ReviewsViewEntity => ({
  eventId: '',
  userId: '',
  reviewId: String(staticReview.id),
  reservationId: '',
  rating: staticReview.rating,
  overallRating: staticReview.rating,
  serviceRating: staticReview.rating,
  rideRating: staticReview.rating,
  recommendToOthers: false,
  content: staticReview.content,
  reviewStatus: 'ACTIVE',
  createdAt: staticReview.createdAt,
  updatedAt: '',
  userNickname: staticReview.userNickname,
  eventName: staticReview.eventName,
  eventLocationName: staticReview.eventLocationName,
  userProfileImage: '',
  eventType: 'CONCERT',
  eventImageUrl: '',
  eventArtists: [],
  reviewImages: staticReview.reviewImages,
});
