import { z } from 'zod';

export const AnnouncementResponseModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AnnouncementResponseModel = z.infer<
  typeof AnnouncementResponseModelSchema
>;
