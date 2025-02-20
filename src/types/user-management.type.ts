import { z } from 'zod';
import {
  ArtistSchema,
  EventSchema,
  ShuttleRouteSchema,
  TripTypeEnum,
} from './shuttle-operation.type';
import { ActiveStatusEnum } from './common.type';

//  ----- ENUM -----

export const ShuttleDemandStatusEnum = z.enum([
  'OPEN', // 수요조사가 아직 모집 중인 상태
  'CLOSED', // 수요조사 모집 종료
  'ENDED', // 행사가 끝나 셔틀 운행 종료
  'CANCELLED', // 무산 상태
  'INACTIVE', // 비활성 상태
]);
export type ShuttleDemandStatus = z.infer<typeof ShuttleDemandStatusEnum>;

export const HandyStatusEnum = z.enum([
  'NOT_SUPPORTED', // 핸디 미지원
  'SUPPORTED', // 핸디 지원
  'DECLINED', // 핸디 거절
  'ACCEPTED', // 핸디 승인
]);
export type HandyStatus = z.infer<typeof HandyStatusEnum>;

export const ReservationStatusEnum = z.enum([
  'NOT_PAYMENT', // 결제 전
  'COMPLETE_PAYMENT', // 결제 완료
  'CANCEL', // 예약 취소
]);
export type ReservationStatus = z.infer<typeof ReservationStatusEnum>;

export const CancelStatusEnum = z.enum([
  'NONE',
  'CANCEL_REQUEST', // 환불 신청
  'CANCEL_COMPLETE', // 환불 처리 완료
]);
export type CancelStatus = z.infer<typeof CancelStatusEnum>;

export const IssuedCouponStatusEnum = z.enum([
  'BEFORE_USE',
  'USED',
  'EXPIRED',
  'RETRIEVED',
  'DELETED',
]);
export type IssuedCouponStatus = z.infer<typeof IssuedCouponStatusEnum>;

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

const ProgressTypeEnum = z.enum([
  'MARKETING_CONSENT',
  'SERVICE_TERMS_AGREEMENT',
  'PERSONAL_INFO_CONSENT',
  'ONBOARDING_COMPLETE',
  'PAYMENT_COMPLETE',
]);
export type ProgressType = z.infer<typeof ProgressTypeEnum>;

// const AuthChannelTypeEnum = z.enum(['NONE', 'kakao', 'naver']);
// export type AuthChannelType = z.infer<typeof AuthChannelTypeEnum>;

//  ----- SCHEMA -----
export const ShuttleDemandSchema = z
  .object({
    shuttleDemandId: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userProfileImage: z.string(),
    event: EventSchema,
    eventId: z.string(),
    dailyEventId: z.string(),
    regionId: z.string(),
    toDestinationRegionHub: z
      .object({
        regionHubId: z.string(),
        name: z.string(),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .nullable(),
    desiredToDestinationRegionHub: z.string().nullable(),
    fromDestinationRegionHub: z
      .object({
        regionHubId: z.string(),
        name: z.string(),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .nullable(),
    desiredFromDestinationRegionHub: z.string().nullable(),
    type: TripTypeEnum,
    passengerCount: z.number(),
    status: ShuttleDemandStatusEnum,
    hasShuttleRoute: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type ShuttleDemand = z.infer<typeof ShuttleDemandSchema>;

export const ReservationSchema = z
  .object({
    reservationId: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userPhoneNumber: z.string(),
    userProfileImage: z.string(),
    shuttleRouteId: z.string(),
    type: TripTypeEnum,
    toDestinationShuttleRouteHubId: z.string().nullable(),
    fromDestinationShuttleRouteHubId: z.string().nullable(),
    handyStatus: HandyStatusEnum,
    hasReview: z.boolean(),
    reservationStatus: ReservationStatusEnum,
    cancelStatus: CancelStatusEnum,
    paymentId: z.string().nullable(),
    paymentPrincipalAmount: z.number().nullable(), // 할인 전 원금
    paymentAmount: z.number().nullable(), // 할인 후 총 결제 금액
    paymentDiscountAmount: z.number().nullable(),
    paymentCouponDiscountAmount: z.number().nullable(),
    paymentEarlybirdDiscountAmount: z.number().nullable(),
    paymentCreatedAt: z.string().nullable(),
    paymentUpdatedAt: z.string().nullable(),
    shuttleBusId: z.string().nullable(),
    passengerCount: z.number().int(),
    shuttleRoute: ShuttleRouteSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type Reservation = z.infer<typeof ReservationSchema>;

export const RefundRequestSchema = z
  .object({
    refundRequestId: z.string(), // 환불 요청 PK
    paymentId: z.string(),
    principalAmount: z.number(), // 결제의 원래 총 결제 금액
    previousRefundableAmount: z.number(), // 환불 요청 시점에서 환불 가능 금액
    refundAmount: z.number(), // 환불 요청 금액
    afterRefundableAmount: z.number().nullable(), // 환불 완료 후 환불 된 금액 (완료 전이면 null)
    refundReason: z.string(), // 환불 사유
    createdAt: z.string(), // 환불 요청 시점
    updatedAt: z.string(),
    refundAt: z.string().nullable(), // 환불 완료 시점
    failedReason: z.string(),
    status: z.enum(['REQUESTED', 'COMPLETED', 'FAILED']),
  })
  .strict();
export type RefundRequest = z.infer<typeof RefundRequestSchema>;

export const PaymentSchema = z
  .object({
    paymentId: z.string(), // 결제 PK
    principalAmount: z.number(), // 원금 (할인 전 금액)
    paymentAmount: z.number(), // 결제 금액
    discountAmount: z.number(), // 총 할인 금액
    couponDiscountAmount: z.number(), // 쿠폰 할인 금액
    earlybirdDiscountAmount: z.number(), // 얼리버드 할인 금액
    refundableAmount: z.number(), // 환불 가능 금액
    issuedCouponId: z.string().nullable(), // 발행된 쿠폰 ID
    reservationId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    refundRequests: RefundRequestSchema.array().nullable(),
  })
  .strict();
export type Payment = z.infer<typeof PaymentSchema>;

export const IssuedCouponSchema = z
  .object({
    issuedCouponId: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userProfileImage: z.string(),
    code: z.string(),
    name: z.string(),
    discountType: z.enum(['RATE', 'AMOUNT']),
    discountRate: z.number().nullable(),
    discountAmount: z.number().nullable(),
    maxDiscountAmount: z.number().nullable(),
    maxApplicablePeople: z.number().nullable(),
    validFrom: z.string(),
    validTo: z.string(),
    status: IssuedCouponStatusEnum,
  })
  .strict();
export type IssuedCoupon = z.infer<typeof IssuedCouponSchema>;

export const UserSchema = z
  .object({
    userId: z.string(),
    nickname: z.string().nullable(),
    profileImage: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    gender: GenderEnum,
    ageRange: AgeRangeEnum,
    // authChannelType: AuthChannelTypeEnum,
    lastLoginAt: z.string().nullable(),
    regionId: z.string().nullable(),
    favoriteArtists: ArtistSchema.array().nullable(),
    progresses: z
      .object({
        progressType: ProgressTypeEnum,
        isCompleted: z.boolean(),
      })
      .array(),
    status: ActiveStatusEnum,
  })
  .strict();
export type User = z.infer<typeof UserSchema>;

export const UserStatsSchema = z
  .object({
    userId: z.string(),
    nickname: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    profileImage: z.string().nullable(),
    gender: GenderEnum,
    ageRange: AgeRangeEnum.exclude(['연령대 미지정']),
    // authChannel: AuthChannelTypeEnum,
    regionId: z.string().nullable(),
    socialInfo: z.object({
      uniqueId: z.string(),
      nickname: z.string(),
    }),
    favoriteArtists: ArtistSchema.array().nullable(),
    currentReservationCount: z.number(),
    pastReservationCount: z.number(),
    activeCouponCount: z.number(),
    reviewCount: z.number(),
    shuttleDemandCount: z.number(),
  })
  .strict();
export type UserStats = z.infer<typeof UserStatsSchema>;

// ----- POST & PUT BODY -----

export const PutUserBodySchema = z
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
export type PutUserBody = z.infer<typeof PutUserBodySchema>;
