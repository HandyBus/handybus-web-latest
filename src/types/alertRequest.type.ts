import { z } from 'zod';
import { ShuttleRoutesViewEntitySchema } from './shuttleRoute.type';

export const ShuttleRouteAlertRequestsViewEntitySchema = z.object({
  shuttleRouteAlertRequestId: z.string(),
  shuttleRouteId: z.string(),
  userId: z.string(),
  userNickname: z.string(),
  userProfileImage: z.string().nullable(),
  shuttleRouteHubId: z.string(),
  notifiedAt: z.string().nullable(),
  notificationRequestedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  queueIndex: z.number(),
  shuttleRoute: ShuttleRoutesViewEntitySchema,
});
export type ShuttleRouteAlertRequestsViewEntity = z.infer<
  typeof ShuttleRouteAlertRequestsViewEntitySchema
>;
