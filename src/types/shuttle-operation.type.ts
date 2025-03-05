import { z } from 'zod';
import { ActiveStatusEnum } from './common.type';

//  ----- ENUM -----

export const EventTypeEnum = z.enum(['CONCERT', 'FESTIVAL']);
export type EventType = z.infer<typeof EventTypeEnum>;

export const EventStatusEnum = z.enum([
  'OPEN', // 행사 수요조사 모집 중
  'CLOSED', // 행사 수요조사 모집 종료 (dailyEvent의 경우에는 해당 일자의 수요조사 모집 종료)
  'ENDED', // 행사 종료
  'INACTIVE', // 행사 비활성
]);
export type EventStatus = z.infer<typeof EventStatusEnum>;

export const ShuttleRouteStatusEnum = z.enum([
  'OPEN', // 예약 모집 중
  'CLOSED', // 예약 마감
  'ENDED', // 운행 종료
  'CANCELLED', // 무산
  'INACTIVE', // 비활성
]);
export type ShuttleRouteStatus = z.infer<typeof ShuttleRouteStatusEnum>;

export const TripTypeEnum = z.enum([
  'TO_DESTINATION', // 가는 편
  'FROM_DESTINATION', // 오는 편
  'ROUND_TRIP', // 왕복행
]);
export type TripType = z.infer<typeof TripTypeEnum>;

export const ShuttleBusTypeEnum = z.enum([
  'SMALL_BUS_28',
  'LIMOUSINE_BUS_31',
  'SPRINTER_12',
  'VAN_12',
  'MINIBUS_24',
  'LARGE_BUS_45',
  'LARGE_BUS_41',
  'PREMIUM_BUS_21',
  'MEDIUM_BUS_21',
  'SMALL_BUS_33',
]);
export type ShuttleBusType = z.infer<typeof ShuttleBusTypeEnum>;

//  ----- SCHEMA -----

export const ArtistsViewEntitySchema = z
  .object({
    artistId: z.string(),
    artistName: z.string(),
  })
  .strict();
export type ArtistsViewEntity = z.infer<typeof ArtistsViewEntitySchema>;

export const DailyEventsInEventsViewEntitySchema = z
  .object({
    dailyEventId: z.string(),
    date: z.string(),
    status: EventStatusEnum,
  })
  .strict();
export type DailyEventsInEventsViewEntity = z.infer<
  typeof DailyEventsInEventsViewEntitySchema
>;

export const EventsViewEntitySchema = z
  .object({
    eventId: z.string(),
    eventName: z.string(),
    eventType: EventTypeEnum,
    regionId: z.string(),
    regionHubId: z.string(),
    eventStatus: EventStatusEnum,
    eventImageUrl: z.string().nullable(),
    eventLocationName: z.string(),
    eventLocationAddress: z.string(),
    eventLocationLatitude: z.number(),
    eventLocationLongitude: z.number(),
    eventArtists: ArtistsViewEntitySchema.array().nullable(),
    dailyEvents: DailyEventsInEventsViewEntitySchema.array(),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type EventsViewEntity = z.infer<typeof EventsViewEntitySchema>;

export const ShuttleRouteHubsInShuttleRoutesViewEntitySchema = z
  .object({
    shuttleRouteHubId: z.string(),
    regionHubId: z.string(),
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    type: TripTypeEnum,
    sequence: z.number(),
    arrivalTime: z.string(),
    status: ActiveStatusEnum,
    regionId: z.string(),
  })
  .strict();
export type ShuttleRouteHubsInShuttleRoutesViewEntity = z.infer<
  typeof ShuttleRouteHubsInShuttleRoutesViewEntitySchema
>;

export const ShuttleRoutesViewEntitySchema = z
  .object({
    shuttleRouteId: z.string(),
    eventId: z.string(),
    dailyEventId: z.string(),
    name: z.string(),
    reservationDeadline: z.string(),
    hasEarlybird: z.boolean(),
    earlybirdDeadline: z.string().nullable(),
    earlybirdPriceToDestination: z.number().nullable(),
    earlybirdPriceFromDestination: z.number().nullable(),
    earlybirdPriceRoundTrip: z.number().nullable(),
    regularPriceToDestination: z.number(),
    regularPriceFromDestination: z.number(),
    regularPriceRoundTrip: z.number(),
    maxPassengerCount: z.number(),
    toDestinationCount: z.number(), // 가는 편 예약 탑승객 수
    fromDestinationCount: z.number(), // 오는 편 예약 탑승객 수
    remainingSeatCount: z.number(),
    remainingSeatType: TripTypeEnum,
    status: ShuttleRouteStatusEnum,
    toDestinationShuttleRouteHubs:
      ShuttleRouteHubsInShuttleRoutesViewEntitySchema.array().nullable(),
    fromDestinationShuttleRouteHubs:
      ShuttleRouteHubsInShuttleRoutesViewEntitySchema.array().nullable(),
    event: EventsViewEntitySchema,
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type ShuttleRoutesViewEntity = z.infer<
  typeof ShuttleRoutesViewEntitySchema
>;

export const ShuttleBusesViewEntitySchema = z
  .object({
    shuttleBusId: z.string(),
    shuttleRouteId: z.string(),
    busType: ShuttleBusTypeEnum,
    busName: z.string(),
    busNumber: z.string(),
    busCapacity: z.number(),
    busDriverPhoneNumber: z.string(),
    openChatLink: z.string().nullable(),
  })
  .strict();
export type ShuttleBusesViewEntity = z.infer<
  typeof ShuttleBusesViewEntitySchema
>;

export const ReviewsViewEntitySchema = z
  .object({
    reviewId: z.string(),
    reservationId: z.string(),
    rating: z.number(),
    content: z.string(),
    reviewStatus: ActiveStatusEnum,
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userProfileImage: z.string().nullable(),
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

export const ShuttleDemandStatisticsReadModelSchema = z.object({
  roundTripCount: z.number(),
  toDestinationCount: z.number(),
  fromDestinationCount: z.number(),
});
export type ShuttleDemandStatisticsReadModel = z.infer<
  typeof ShuttleDemandStatisticsReadModelSchema
>;

// ----- POST & PUT BODY -----

export const CreateShuttleDemandRequestSchema = z.object({
  regionId: z.string(),
  type: TripTypeEnum,
  passengerCount: z.number(),
  toDestinationRegionHub: z
    .object({
      regionHubId: z.string().optional(),
      desiredRegionHub: z.string().optional(),
    })
    .optional(),
  fromDestinationRegionHub: z
    .object({
      regionHubId: z.string().optional(),
      desiredRegionHub: z.string().optional(),
    })
    .optional(),
});
export type CreateShuttleDemandRequest = z.infer<
  typeof CreateShuttleDemandRequestSchema
>;

export const CreateReviewRequestSchema = z.object({
  eventId: z.string(),
  reservationId: z.string(),
  rating: z.number().int().min(1).max(5),
  content: z.string(),
  images: z
    .object({
      imageUrl: z.string(),
    })
    .array()
    .nullable(),
});
export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;
