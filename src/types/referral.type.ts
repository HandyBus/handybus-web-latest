import { z } from 'zod';

export const ReferralConditionsInReferralsViewEntitySchema = z.object({
  referralConditionId: z.string(),
  referralId: z.string(),
  conditionType: z.enum(['EVENT', 'SHUTTLE_ROUTE', 'RESERVATION']),
  eventId: z.string().nullable(),
  shuttleRouteId: z.string().nullable(),
  reservationId: z.string().nullable(),
});

export const ReferralsViewEntitySchema = z.object({
  referralId: z.string(),
  referralCode: z.string(),
  name: z.string(),
  discountAmount: z.number(),
  maxUsage: z.number(),
  validFrom: z.string(),
  validTo: z.string(),
  isActive: z.boolean(),
  creatorType: z.enum(['ADMIN', 'USER']),
  creatorUserId: z.string().nullable(),
  creatorAdminId: z.string().nullable(),
  usageCount: z.number(),
  conditions: ReferralConditionsInReferralsViewEntitySchema.array(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ReferralsViewEntity = z.infer<typeof ReferralsViewEntitySchema>;
