import { z } from 'zod';

export const ArtistsViewEntitySchema = z
  .object({
    artistId: z.string(),
    artistName: z.string(),
  })
  .strict();
export type ArtistsViewEntity = z.infer<typeof ArtistsViewEntitySchema>;
