import { z } from 'zod';

//  ----- GET -----

export const RegionHubsResponseModelSchema = z.object({
  regionHubId: z.string(),
  regionId: z.string(),
  name: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type RegionHubsResponseModel = z.infer<
  typeof RegionHubsResponseModelSchema
>;
