import { z } from 'zod';
import { TripTypeEnum } from './shuttleRoute.type';
import { EventsViewEntitySchema } from './event.type';

//  ----- ENUM -----

export const ShuttleDemandStatusEnum = z.enum(['SUBMITTED', 'CANCELLED']);
export type ShuttleDemandStatus = z.infer<typeof ShuttleDemandStatusEnum>;

//  ----- GET -----

export const ShuttleDemandsViewEntitySchema = z
  .object({
    shuttleDemandId: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userProfileImage: z.string().nullable(),
    event: z.lazy(() => EventsViewEntitySchema),
    eventId: z.string(),
    dailyEventId: z.string(),
    regionId: z.string(),
    toDestinationRegionHub: z
      .object({
        regionHubId: z.string(),
        name: z.string(),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .nullable(),
    desiredToDestinationRegionHub: z.string().nullable(),
    fromDestinationRegionHub: z
      .object({
        regionHubId: z.string(),
        name: z.string(),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .nullable(),
    desiredFromDestinationRegionHub: z.string().nullable(),
    type: TripTypeEnum,
    passengerCount: z.number(),
    status: ShuttleDemandStatusEnum,
    hasShuttleRoute: z.boolean(), // 수요조사 한 정류장에 셔틀 노선이 있는지 여부
    hasShuttleRouteInRelatedRegion: z.boolean(), // 수요조사 한 정류장을 포함하여 인접한 정류장에 셔틀 노선이 있는지 여부
    isFulfilled: z.boolean(), //수요조사 한 행사 예약 여부
    demandCountOnRegion: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type ShuttleDemandsViewEntity = z.infer<
  typeof ShuttleDemandsViewEntitySchema
>;

export const ShuttleDemandStatisticsReadModelSchema = z
  .object({
    eventId: z.string().nullable(),
    eventName: z.string().nullable(),
    eventImageUrl: z.string().nullable(),
    dailyEventId: z.string().nullable(),
    provinceFullName: z.string().nullable(),
    provinceShortName: z.string().nullable(),
    cityFullName: z.string().nullable(),
    cityShortName: z.string().nullable(),
    regionHubName: z.string().nullable(),
    regionHubId: z.string().nullable(),
    regionHubLatitude: z.number().nullable(),
    regionHubLongitude: z.number().nullable(),
    totalCount: z.number(),
    roundTripCount: z.number(),
    toDestinationCount: z.number(),
    fromDestinationCount: z.number(),
  })
  .strict();
export type ShuttleDemandStatisticsReadModel = z.infer<
  typeof ShuttleDemandStatisticsReadModelSchema
>;

// ----- POST -----

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
