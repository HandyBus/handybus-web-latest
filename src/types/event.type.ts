import { z } from 'zod';
import { ArtistsViewEntitySchema } from './artist.type';

//  ----- ENUM -----

export const EventTypeEnum = z.enum(['CONCERT', 'FESTIVAL', 'SPORTS']);
export type EventType = z.infer<typeof EventTypeEnum>;

export const EventStatusEnum = z.enum([
  'STAND_BY',
  'OPEN',
  'CLOSED', // TODO: 삭제
  'ENDED',
  'INACTIVE',
]);
export type EventStatus = z.infer<typeof EventStatusEnum>;

export const DailyEventStatusEnum = z.enum([
  'OPEN',
  'CLOSED', // TODO: 삭제
  'ENDED',
  'INACTIVE',
]);
export type DailyEventStatus = z.infer<typeof DailyEventStatusEnum>;

export const DemandControlModeEnum = z.enum(['AUTO', 'MANUAL']);
export type DemandControlMode = z.infer<typeof DemandControlModeEnum>;

// ----- GET -----

export const DailyEventsInEventsViewEntitySchema = z
  .object({
    dailyEventId: z.string(),
    dailyEventDate: z.string(),
    dailyEventStatus: DailyEventStatusEnum,
    dailyEventIsDemandOpen: z.boolean(),
    dailyEventMetadata: z.record(z.string(), z.any()).nullable(),
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
    eventImageUrl: z.string(),
    eventDetailImageUrl: z.string().nullable(),
    eventLocationName: z.string(),
    eventLocationAddress: z.string(),
    eventLocationLatitude: z.number(),
    eventLocationLongitude: z.number(),
    eventIsPinned: z.boolean(),
    eventMinRoutePrice: z.number().nullable(),
    eventHasOpenRoute: z.boolean(),
    eventRecommendationScore: z.number(),
    eventArtists: ArtistsViewEntitySchema.array().nullable(),
    dailyEvents: DailyEventsInEventsViewEntitySchema.array(),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    eventMetadata: z.record(z.string(), z.any()).nullable(),
  })
  .strict();
export type EventsViewEntity = z.infer<typeof EventsViewEntitySchema>;
