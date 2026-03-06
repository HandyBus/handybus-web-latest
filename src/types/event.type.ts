import { z } from 'zod';
import { ArtistsInEventsViewEntitySchema } from './artist.type';

//  ----- ENUM -----

export const EventTypeEnum = z.enum(['CONCERT', 'FESTIVAL', 'SPORTS']);
export type EventType = z.infer<typeof EventTypeEnum>;

export const EventStatusEnum = z.enum([
  'STAND_BY',
  'OPEN',
  'ENDED',
  'INACTIVE',
]);
export type EventStatus = z.infer<typeof EventStatusEnum>;

export const DailyEventStatusEnum = z.enum(['OPEN', 'ENDED', 'INACTIVE']);
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
    eventDisplayName: z.string(),
    eventOfficialName: z.string(),
    eventType: EventTypeEnum,
    regionId: z.string(),
    regionHubId: z.string(),
    eventStatus: EventStatusEnum,
    eventMetadata: z.record(z.string(), z.any()).nullable(),
    eventImageUrl: z.string().nullable(),
    eventDisplayImageUrl: z.string().nullable(),
    eventDetailImageUrl: z.string().nullable(),
    eventTicketUrl: z.string().nullable(),
    eventGeneralSaleDate: z.string().nullable(),
    eventPreSaleDate: z.string().nullable(),
    eventOfficialPosterImageUrl: z.string().nullable(),
    eventLocationName: z.string(),
    eventLocationAddress: z.string(),
    eventLocationLatitude: z.number(),
    eventLocationLongitude: z.number(),
    eventArtists: ArtistsInEventsViewEntitySchema.array().nullable(),
    dailyEvents: DailyEventsInEventsViewEntitySchema.array().nullable(),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    eventIsPinned: z.boolean(),
    eventMinRoutePrice: z.number().nullable(),
    eventHasOpenRoute: z.boolean(),
    eventRecommendationScore: z.number(),
  })
  .strict();
export type EventsViewEntity = z.infer<typeof EventsViewEntitySchema>;
