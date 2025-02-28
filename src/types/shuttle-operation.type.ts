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

export const ArtistSchema = z
  .object({
    artistId: z.string(),
    artistName: z.string(),
  })
  .strict();
export type Artist = z.infer<typeof ArtistSchema>;

export const DailyEventSchema = z
  .object({
    dailyEventId: z.string(),
    date: z.string(),
    status: EventStatusEnum,
  })
  .strict();
export type DailyEvent = z.infer<typeof DailyEventSchema>;

export const EventSchema = z
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
    eventArtists: ArtistSchema.array().nullable(),
    dailyEvents: DailyEventSchema.array(),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type Event = z.infer<typeof EventSchema>;

export const ShuttleRouteHubSchema = z
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
export type ShuttleRouteHub = z.infer<typeof ShuttleRouteHubSchema>;

export const ShuttleRouteSchema = z
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
    toDestinationShuttleRouteHubs: ShuttleRouteHubSchema.array().nullable(),
    fromDestinationShuttleRouteHubs: ShuttleRouteHubSchema.array().nullable(),
    event: EventSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type ShuttleRoute = z.infer<typeof ShuttleRouteSchema>;

export const ShuttleBusSchema = z
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
export type ShuttleBus = z.infer<typeof ShuttleBusSchema>;

export const ReviewSchema = z
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
    eventArtists: ArtistSchema.array().nullable(),
    reviewImages: z
      .object({
        imageUrl: z.string().url(),
        status: ActiveStatusEnum,
      })
      .array()
      .nullable(),
  })
  .strict();
export type Review = z.infer<typeof ReviewSchema>;

export const EventDemandStatsSchema = z.object({
  fromDestinationCount: z.number(),
  roundTripCount: z.number(),
  toDestinationCount: z.number(),
});
export type EventDemandStats = z.infer<typeof EventDemandStatsSchema>;

// ----- POST & PUT BODY -----

export const PostDemandBodySchema = z.object({
  regionId: z.string(),
  type: z.enum(['TO_DESTINATION', 'FROM_DESTINATION', 'ROUND_TRIP']),
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
export type PostDemandBody = z.infer<typeof PostDemandBodySchema>;

export const PutShuttleBusBodySchema = z.object({
  openChatLink: z.string().url(),
});
export type PutShuttleBusBody = z.infer<typeof PutShuttleBusBodySchema>;

export const PostReviewBodySchema = z.object({
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
export type PostReviewBody = z.infer<typeof PostReviewBodySchema>;
