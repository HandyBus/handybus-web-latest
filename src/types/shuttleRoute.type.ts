import { z } from 'zod';
import { ActiveStatusEnum } from './common.type';
import { EventsViewEntitySchema } from './event.type';

//  ----- ENUM -----

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
  'ROUND_TRIP', // 왕복
]);
export type TripType = z.infer<typeof TripTypeEnum>;

export const HubRoleEnum = z.enum(['HUB', 'DESTINATION']);
export type HubRole = z.infer<typeof HubRoleEnum>;

// ----- GET -----

export const ShuttleRouteHubsInShuttleRoutesViewEntitySchema = z
  .object({
    shuttleRouteHubId: z.string(),
    regionHubId: z.string(),
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    type: TripTypeEnum.exclude(['ROUND_TRIP']),
    role: HubRoleEnum,
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
    // 가는편과 오는편의 정류장들은 미러링이 보장됨
    toDestinationShuttleRouteHubs:
      ShuttleRouteHubsInShuttleRoutesViewEntitySchema.array().nullable(),
    fromDestinationShuttleRouteHubs:
      ShuttleRouteHubsInShuttleRoutesViewEntitySchema.array().nullable(),
    event: z.lazy(() => EventsViewEntitySchema),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type ShuttleRoutesViewEntity = z.infer<
  typeof ShuttleRoutesViewEntitySchema
>;
