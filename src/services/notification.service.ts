import { silentParse } from '@/utils/config.util';
import {
  NotificationEventCreateRequest,
  NotificationEventCreateRequestSchema,
} from '@/types/notification.type';
import { authInstance } from './config';

export const postNotificationEvent = async (
  body: NotificationEventCreateRequest,
) => {
  await authInstance.post(
    '/v1/notifications/notification-events',
    silentParse(NotificationEventCreateRequestSchema, body),
  );
};
