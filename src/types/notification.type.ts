import { z } from 'zod';

export const NotificationEventTypeEnum = z.enum(['OPEN']);
export type NotificationEventType = z.infer<typeof NotificationEventTypeEnum>;

export const NotificationEventCreateRequestSchema = z
  .object({
    notificationDeliveryId: z.string(),
    eventType: NotificationEventTypeEnum,
  })
  .strict();
export type NotificationEventCreateRequest = z.infer<
  typeof NotificationEventCreateRequestSchema
>;
