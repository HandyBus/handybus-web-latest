import { z } from 'zod';
import { ActiveStatusEnum } from './common.type';
import { ArtistsViewEntitySchema } from './artist.type';

//  ----- ENUM -----

export const GenderEnum = z.enum(['NONE', 'FEMALE', 'MALE']);
export type Gender = z.infer<typeof GenderEnum>;

export const AgeRangeEnum = z.enum([
  '연령대 미지정',
  '10대 이하',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대',
  '70대',
  '80대 이상',
]);
export type AgeRange = z.infer<typeof AgeRangeEnum>;

//  ----- GET -----

export const UsersViewEntitySchema = z
  .object({
    userId: z.string(),
    nickname: z.string().nullable(),
    profileImage: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    gender: GenderEnum,
    ageRange: AgeRangeEnum,
    lastLoginAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    regionId: z.string().nullable(),
    favoriteArtists: ArtistsViewEntitySchema.array().nullable(),
    status: ActiveStatusEnum,
    isConnectedKakao: z.boolean(),
    isConnectedNaver: z.boolean(),
    onboardingComplete: z.boolean(),
    marketingConsent: z.boolean(),
    serviceTermsAgreement: z.boolean(),
    personalInfoConsent: z.boolean(),
    entryGreetingChecked: z.boolean(),
  })
  .strict();
export type UsersViewEntity = z.infer<typeof UsersViewEntitySchema>;

export const UserStatsReadModelSchema = z
  .object({
    userId: z.string(),
    currentReservationCount: z.number(),
    pastReservationCount: z.number(),
    activeCouponCount: z.number(),
    reviewCount: z.number(),
    shuttleDemandCount: z.number(),
  })
  .strict();
export type UserStatsReadModel = z.infer<typeof UserStatsReadModelSchema>;

// ----- POST BODY -----

export const UpdateMeRequestSchema = z
  .object({
    profileImage: z.string().nullable(),
    nickname: z.string(),
    phoneNumber: z.string(),
    gender: GenderEnum.exclude(['NONE']),
    ageRange: AgeRangeEnum.exclude(['연령대 미지정']),
    regionId: z.string(),
    favoriteArtistsIds: z.string().array(),
    isAgreedMarketing: z.boolean(),
    isAgreedServiceTerms: z.boolean(),
    isAgreedPersonalInfo: z.boolean(),
  })
  .partial();
export type UpdateMeRequest = z.infer<typeof UpdateMeRequestSchema>;
