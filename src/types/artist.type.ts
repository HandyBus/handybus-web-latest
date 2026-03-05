import { z } from 'zod';

export const ArtistsInArtistViewEntitySchema = z
  .object({
    relationId: z.string(),
    artistId: z.string(),
    artistName: z.string(),
    artistDisplayName: z.string().nullable(),
    artistAbbreviatedName: z.string().nullable(),
    artistLogoImageUrl: z.string().nullable(),
    artistMainImageUrl: z.string().nullable(),
  })
  .strict();
export type ArtistsInArtistViewEntity = z.infer<
  typeof ArtistsInArtistViewEntitySchema
>;

export const UserFavoriteArtistsInUsersViewEntitySchema = z
  .object({
    artistId: z.string(),
    artistName: z.string(),
    artistDisplayName: z.string().nullable(),
    artistAbbreviatedName: z.string().nullable(),
    artistLogoImageUrl: z.string().nullable(),
    artistMainImageUrl: z.string().nullable(),
  })
  .strict();
export type UserFavoriteArtistsInUsersViewEntity = z.infer<
  typeof UserFavoriteArtistsInUsersViewEntitySchema
>;

export const ArtistsViewEntitySchema = z
  .object({
    artistId: z.string(),
    artistName: z.string(),
    artistDisplayName: z.string(),
    artistSubDisplayName: z.string().nullable(),
    artistAbbreviatedName: z.string().nullable(),
    artistLogoImageUrl: z.string().nullable(),
    artistMainImageUrl: z.string().nullable(),
    artistDescription: z.string().nullable(),
    parentArtists: ArtistsInArtistViewEntitySchema.array().nullable(),
    childArtists: ArtistsInArtistViewEntitySchema.array().nullable(),
  })
  .strict();
export type ArtistsViewEntity = z.infer<typeof ArtistsViewEntitySchema>;
