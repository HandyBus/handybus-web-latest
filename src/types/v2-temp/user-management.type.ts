import { z } from 'zod';
import {
  EventSchema,
  ShuttleRouteSchema,
  TripTypeEnum,
} from './shuttle-operation.type';

//  ----- ENUM -----

const ShuttleDemandStatusEnum = z.enum([
  'OPEN', // 수요조사가 아직 모집 중인 상태
  'CLOSED', // 수요조사 모집 종료
  'ENDED', // 행사가 끝나 셔틀 운행 종료
  'CANCELLED', // 무산 상태
  'INACTIVE', // 비활성 상태
]);
export type ShuttleDemandStatus = z.infer<typeof ShuttleDemandStatusEnum>;

const HandyStatusEnum = z.enum([
  'NOT_SUPPORTED', // 핸디 미지원
  'SUPPORTED', // 핸디 지원
  'DECLINED', // 핸디 거절
  'ACCEPTED', // 핸디 승인
]);
export type HandyStatus = z.infer<typeof HandyStatusEnum>;

const ReservationStatusEnum = z.enum([
  'NOT_PAYMENT', // 결제 전
  'COMPLETE_PAYMENT', // 결제 완료
  'RESERVATION_CONFIRM', // 예약 확정
  'CANCEL', // 예약 취소
]);
export type ReservationStatus = z.infer<typeof ReservationStatusEnum>;

const CancelStatusEnum = z.enum([
  'NONE',
  'CANCEL_REQUEST', // 환불 신청
  'CANCEL_COMPLETE', // 환불 처리 완료
]);
export type CancelStatus = z.infer<typeof CancelStatusEnum>;

//  ----- SCHEMA -----
export const ShuttleDemandSchema = z
  .object({
    shuttleDemandId: z.number(),
    userId: z.number(),
    userNickname: z.string(),
    userProfileImage: z.string().url(),
    event: EventSchema,
    eventId: z.number(),
    dailyEventId: z.number(),
    regionId: z.number(),
    toDestinationRegionHub: z
      .object({
        regionHubId: z.number(),
        name: z.string(),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .nullable(),
    desiredToDestinationRegionHub: z.string().nullable(),
    fromDestinationRegionHub: z
      .object({
        regionHubId: z.number(),
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
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type ShuttleDemand = z.infer<typeof ShuttleDemandSchema>;

export const ReservationSchema = z
  .object({
    reservationId: z.number(),
    userId: z.number(),
    userNickname: z.string(),
    userPhoneNumber: z.string(),
    userProfileImage: z.string().url(),
    shuttleRouteId: z.number(),
    type: TripTypeEnum,
    toDestinationShuttleRouteHubId: z.number(),
    fromDestinationShuttleRouteHubId: z.number(),
    handyStatus: HandyStatusEnum,
    hasReview: z.boolean(),
    reservationStatus: ReservationStatusEnum,
    cancelStatus: CancelStatusEnum,
    paymentId: z.string().nullable(),
    paymentPrincipalAmount: z.number().nullable(),
    paymentAmount: z.number().nullable(),
    paymentDiscountAmount: z.number().nullable(),
    paymentCouponDiscountAmount: z.number().nullable(),
    paymentEarlybirdDiscountAmount: z.number().nullable(),
    paymentCreatedAt: z.string().nullable(),
    paymentUpdatedAt: z.string().nullable(),
    shuttleBusId: z.number(),
    passengers: z
      .object({
        passengerId: z.number(),
        passengerName: z.string(),
        passengerPhoneNumber: z.string(),
      })
      .array()
      .nullable(),
    shuttleRoute: ShuttleRouteSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();
export type Reservation = z.infer<typeof ReservationSchema>;

export const RefundRequestSchema = z
  .object({
    refundRequestId: z.number(), // 환불 요청 PK
    paymentId: z.string(),
    principalAmount: z.number(), // 결제의 원래 총 결제 금액
    previousRefundableAmount: z.number(), // 환불 요청 시점에서 환불 가능 금액
    refundAmount: z.number(), // 환불 요청 금액
    afterRefundableAmount: z.number().nullable(), // 환불 완료 후 환불 가능 금액 (완료 전이면 null)
    refundReason: z.string(), // 환불 사유
    refundAt: z.string().nullable(), // 환불 완료 시점
    failedReason: z.string(),
    status: z.enum(['REQUESTED', 'COMPLETED', 'FAILED']),
  })
  .strict();
export type RefundRequest = z.infer<typeof RefundRequestSchema>;

export const PaymentSchema = z
  .object({
    paymentId: z.string().uuid(), // 결제 PK
    principalAmount: z.number(), // 원금 (할인 전 금액)
    paymentAmount: z.number(), // 결제 금액
    discountAmount: z.number(), // 총 할인 금액
    couponDiscountAmount: z.number(), // 쿠폰 할인 금액
    earlybirdDiscountAmount: z.number(), // 얼리버드 할인 금액
    refundableAmount: z.number(), // 환불 가능 금액
    issuedCouponId: z.number().nullable(), // 발행된 쿠폰 ID
    reservationId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    refundRequests: RefundRequestSchema.array().nullable(),
  })
  .strict();
export type Payment = z.infer<typeof PaymentSchema>;
