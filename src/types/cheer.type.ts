import { z } from 'zod';

export const EventCheerCampaignStatusEnum = z.enum([
  'READY',
  'RUNNING',
  'ENDED',
  'INACTIVE',
]);
export type EventCheerCampaignStatus = z.infer<
  typeof EventCheerCampaignStatusEnum
>;

export const ParticipationTypeEnum = z.enum(['BASE', 'SHARE']);
export type ParticipationType = z.infer<typeof ParticipationTypeEnum>;

// ----- GET -----

const EventCheerDiscountPoliciesInEventCheerCampaignsViewEntitySchema =
  z.object({
    eventCheerDiscountPolicyId: z.string(),
    minParticipationCount: z.number(),
    discountRate: z.number(),
    isActive: z.boolean(),
  });

const EventCheerCampaignResultInEventCheerCampaignsViewEntitySchema = z.object({
  eventCheerCampaignResultId: z.string(),
  totalParticipationCount: z.number(),
  finalDiscountRate: z.number(),
  decidedAt: z.string(),
});

export const EventCheerCampaignsViewEntitySchema = z.object({
  eventCheerCampaignId: z.string(),
  eventId: z.string(),
  status: EventCheerCampaignStatusEnum,
  imageUrl: z.string().nullable(),
  buttonImageUrl: z.string().nullable(),
  buttonText: z.string().nullable(),
  endDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cheerCampaignParticipationTotalCount: z.number(),
  cheerCampaignParticipationTotalUserCount: z.number(),
  discountPolicies:
    EventCheerDiscountPoliciesInEventCheerCampaignsViewEntitySchema.array(),
  result:
    EventCheerCampaignResultInEventCheerCampaignsViewEntitySchema.nullable(),
});
export type EventCheerCampaignsViewEntity = z.infer<
  typeof EventCheerCampaignsViewEntitySchema
>;

export const EventCheerCampaignParticipationResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  cheerCampaignId: z.string(),
  participationType: ParticipationTypeEnum,
  participatedDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type EventCheerCampaignParticipationResponse = z.infer<
  typeof EventCheerCampaignParticipationResponseSchema
>;
