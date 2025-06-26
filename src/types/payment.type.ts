import { z } from 'zod';
import { TripTypeEnum } from './shuttleRoute.type';
import {
  CancelStatusEnum,
  HandyStatusEnum,
  ReservationStatusEnum,
} from './reservation.type';

// ----- GET -----

export const RefundRequestsInPaymentsViewEntitySchema = z
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
export type RefundRequestsInPaymentsViewEntity = z.infer<
  typeof RefundRequestsInPaymentsViewEntitySchema
>;

export const PaymentsViewEntitySchema = z
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
    refundRequests: RefundRequestsInPaymentsViewEntitySchema.array().nullable(),
    isConfirmed: z.boolean(),
    userId: z.string(),
  })
  .strict();
export type PaymentsViewEntity = z.infer<typeof PaymentsViewEntitySchema>;

// ----- POST -----

export const ReserveRequestSchema = z.object({
  shuttleRouteId: z.string(),
  type: TripTypeEnum,
  toDestinationShuttleRouteHubId: z.string().optional(),
  fromDestinationShuttleRouteHubId: z.string().optional(),
  issuedCouponId: z.string().optional(),
  isSupportingHandy: z.boolean(),
  passengerCount: z.number().int(),
});
export type ReserveRequest = z.infer<typeof ReserveRequestSchema>;

export const PreparePaymentsRequestSchema = z.object({
  reservationId: z.string(),
  issuedCouponId: z.string().nullable(),
});
export type PreparePaymentsRequest = z.infer<
  typeof PreparePaymentsRequestSchema
>;

export const ReserveResponseSchema = z.object({
  reservationId: z.string(),
  type: TripTypeEnum,
  shuttleRouteId: z.string(),
  toDestinationShuttleRouteHubId: z.string().nullable(),
  fromDestinationShuttleRouteHubId: z.string().nullable(),
  shuttleBusId: z.string().nullable(),
  reservationStatus: ReservationStatusEnum,
  cancelStatus: CancelStatusEnum,
  paymentId: z.string().nullable(),
  userId: z.string(),
  handyStatus: HandyStatusEnum,
  createdAt: z.string(),
});
export type ReserveResponse = z.infer<typeof ReserveResponseSchema>;

export const PaymentsResponseModelSchema = z.object({
  paymentId: z.string(),
  reservationId: z.string(),
  issuedCouponId: z.string().nullable(),
  pgType: z.enum(['TOSS']),
  principalAmount: z.number(),
  earlybirdDiscountAmount: z.number(),
  paymentAmount: z.number(),
  couponDiscountAmount: z.number(),
  discountAmount: z.number(),
  refundableAmount: z.number(),
  refundRequests: RefundRequestsInPaymentsViewEntitySchema.array().nullable(),
  createdAt: z.string(),
});
export type PaymentsResponseModel = z.infer<typeof PaymentsResponseModelSchema>;

export const ApprovePaymentsResponseSchema = z.object({
  paymentId: z.string(),
  reservationId: z.string(),
  issuedCouponId: z.string().nullable(),
  pgType: z.enum(['TOSS']),
  principalAmount: z.number(),
  earlybirdDiscountAmount: z.number().nullable(),
  paymentAmount: z.number(),
  couponDiscountAmount: z.number().nullable(),
  discountAmount: z.number(),
  refundableAmount: z.number(),
  refundRequests: RefundRequestsInPaymentsViewEntitySchema.array(),
  createdAt: z.string(),
});
export type ApprovePaymentsResponse = z.infer<
  typeof ApprovePaymentsResponseSchema
>;
