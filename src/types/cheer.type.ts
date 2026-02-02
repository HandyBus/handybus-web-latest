import { z } from 'zod';

// ----- GET -----

const EventCheerDiscountPoliciesInEventCheerCampaignsViewEntitySchema =
  z.object({
    eventCheerDiscountPolicyId: z.string(),
    minParticipationCount: z.number(),
    discountRate: z.number(),
    isActive: z.boolean(),
  });

export const EventCheerCampaignsViewEntitySchema = z.object({
  eventCheerUpCampaignId: z.string(),
  eventId: z.string(),
  imageUrl: z.string().nullable(),
  buttonImageUrl: z.string().nullable(),
  buttonText: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cheerChampaignUserTotalCount: z.number(),
  discountPolicies:
    EventCheerDiscountPoliciesInEventCheerCampaignsViewEntitySchema.array(),
  result: z
    .object({
      eventCheerCampaignResultId: z.string(),
      totalParticiationCount: z.number(),
      finalDiscountRate: z.number(),
      decidedAt: z.string(),
    })
    .nullable(),
});

export type EventCheerCampaignsViewEntity = z.infer<
  typeof EventCheerCampaignsViewEntitySchema
>;
