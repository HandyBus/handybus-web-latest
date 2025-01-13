import { z } from 'zod';

export const RegionHubSchema = z.object({
  regionHubId: z.number(),
  regionId: z.number(),
  name: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type RegionHub = z.infer<typeof RegionHubSchema>;
