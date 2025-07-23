import { z } from 'zod';

//  ----- ENUM -----

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
  'STARIA_7',
]);
export type ShuttleBusType = z.infer<typeof ShuttleBusTypeEnum>;

//  ----- GET -----

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
