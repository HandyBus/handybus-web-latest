import { z } from 'zod';

//  ----- ENUM -----

export const IssuedCouponStatusEnum = z.enum([
  'BEFORE_USE',
  'USED',
  'EXPIRED',
  'RETRIEVED',
  'DELETED',
]);
export type IssuedCouponStatus = z.infer<typeof IssuedCouponStatusEnum>;

export const CouponDiscountTypeEnum = z.enum(['RATE', 'AMOUNT']);
export type CouponDiscountType = z.infer<typeof CouponDiscountTypeEnum>;

// ----- GET -----

export const IssuedCouponsViewEntitySchema = z
  .object({
    issuedCouponId: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userProfileImage: z.string().nullable(),
    code: z.string(),
    name: z.string(),
    discountType: CouponDiscountTypeEnum,
    discountRate: z.number().nullable(),
    discountAmount: z.number().nullable(),
    maxDiscountAmount: z.number().nullable(),
    maxApplicablePeople: z.number().nullable(),
    validFrom: z.string(),
    validTo: z.string(),
    status: IssuedCouponStatusEnum,
  })
  .strict();
export type IssuedCouponsViewEntity = z.infer<
  typeof IssuedCouponsViewEntitySchema
>;
