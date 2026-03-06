import { z } from 'zod';
import { ActiveStatusEnum } from './common.type';

export const ArtistsInArtistViewEntitySchema = z
  .object({
    relationId: z.string(),
    artistId: z.string(),
    artistName: z.string(),
    artistDisplayName: z.string().nullable(),
    artistSubDisplayName: z.string().nullable(),
    artistAbbreviatedName: z.string().nullable(),
    artistLogoImageUrl: z.string().nullable(),
    artistMainImageUrl: z.string().nullable(),
    artistStatus: ActiveStatusEnum,
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
    artistSubDisplayName: z.string().nullable(),
    artistAbbreviatedName: z.string().nullable(),
    artistLogoImageUrl: z.string().nullable(),
    artistMainImageUrl: z.string().nullable(),
  })
  .strict();
export type UserFavoriteArtistsInUsersViewEntity = z.infer<
  typeof UserFavoriteArtistsInUsersViewEntitySchema
>;

export const ArtistsInEventsViewEntitySchema = z
  .object({
    artistId: z.string(),
    artistName: z.string(),
    artistDisplayName: z.string(),
    artistSubDisplayName: z.string().nullable(),
    artistAbbreviatedName: z.string().nullable(),
    artistLogoImageUrl: z.string().nullable(),
    artistMainImageUrl: z.string().nullable(),
    artistDescription: z.string().nullable(),
    artistStatus: ActiveStatusEnum,
    parentArtists: ArtistsInArtistViewEntitySchema.array(),
    childArtists: ArtistsInArtistViewEntitySchema.array(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type ArtistsInEventsViewEntity = z.infer<
  typeof ArtistsInEventsViewEntitySchema
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
    artistStatus: ActiveStatusEnum,
    createdAt: z.string(),
    updatedAt: z.string(),
    parentArtists: ArtistsInArtistViewEntitySchema.array().nullable(),
    childArtists: ArtistsInArtistViewEntitySchema.array().nullable(),
  })
  .strict();
export type ArtistsViewEntity = z.infer<typeof ArtistsViewEntitySchema>;
