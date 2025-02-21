import { z } from 'zod';

export const AdminHandleBannerRequestBannersSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  imageUrl: z.string(),
  linkUrl: z.string(),
  sequence: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional().nullable(),
});

export type AdminHandleBannerRequestBanners = z.infer<
  typeof AdminHandleBannerRequestBannersSchema
>;
