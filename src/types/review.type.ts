import { z } from 'zod';
import { ActiveStatusEnum } from './common.type';
import { EventTypeEnum } from './event.type';
import { ArtistsViewEntitySchema } from './artist.type';

//  ----- GET -----

export const ReviewsViewEntitySchema = z
  .object({
    reviewId: z.string(),
    reservationId: z.string(),
    rating: z.number(),
    overallRating: z.number(),
    serviceRating: z.number(),
    rideRating: z.number(),
    recommendToOthers: z.boolean(),
    content: z.string(),
    reviewStatus: ActiveStatusEnum,
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userName: z.string().nullable(),
    userProfileImage: z.string().nullable(),
    toDestinationRegionId: z.string().nullable(),
    fromDestinationRegionId: z.string().nullable(),
    eventId: z.string(),
    eventName: z.string(),
    eventType: EventTypeEnum,
    eventLocationName: z.string(),
    eventImageUrl: z.string().url(),
    eventArtists: ArtistsViewEntitySchema.array().nullable(),
    reviewImages: z
      .object({
        imageUrl: z.string().url(),
        status: ActiveStatusEnum,
      })
      .array()
      .nullable(),
  })
  .strict();
export type ReviewsViewEntity = z.infer<typeof ReviewsViewEntitySchema>;

export const ReviewStatisticsViewEntitySchema = z.object({
  averageRating: z.number(),
  cumulativeReviewCount: z.number(),
  recommendationScore: z.number(),
});
export type ReviewStatisticsViewEntity = z.infer<
  typeof ReviewStatisticsViewEntitySchema
>;

// ----- POST -----

export const CreateReviewRequestSchema = z.object({
  eventId: z.string(),
  reservationId: z.string(),
  overallRating: z.number().int().min(1).max(5),
  serviceRating: z.number().int().min(1).max(5),
  rideRating: z.number().int().min(1).max(5),
  recommendToOthers: z.boolean(),
  content: z.string(),
  images: z
    .object({
      imageUrl: z.string(),
    })
    .array()
    .nullable(),
});
export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;

export const WriteReviewResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  reservationId: z.string(),
  rating: z.number().int().min(1).max(5),
  serviceRating: z.number().int().min(1).max(5),
  rideRating: z.number().int().min(1).max(5),
  recommendToOthers: z.boolean(),
  content: z.string(),
  images: z
    .object({
      imageUrl: z.string(),
    })
    .array()
    .nullable(),
  status: ActiveStatusEnum.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type WriteReviewResponse = z.infer<typeof WriteReviewResponseSchema>;

// ----- PUT -----

export const EditReviewRequestSchema = z.object({
  reviewId: z.string(),
  eventId: z.string(),
  reservationId: z.string(),
  overallRating: z.number().int().min(1).max(5),
  serviceRating: z.number().int().min(1).max(5),
  rideRating: z.number().int().min(1).max(5),
  recommendToOthers: z.boolean(),
  content: z.string(),
  images: z
    .object({
      imageUrl: z.string(),
    })
    .array()
    .nullable(),
});
export type EditReviewRequest = z.infer<typeof EditReviewRequestSchema>;
