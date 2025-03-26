import { z } from 'zod';
import { ArtistsViewEntitySchema } from './artist.type';

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

// ----- GET -----

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
    minRoutePrice: z.number().nullable(),
  })
  .strict();
export type EventsViewEntity = z.infer<typeof EventsViewEntitySchema>;
