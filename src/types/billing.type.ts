import { z } from 'zod';
import { TripTypeEnum } from './shuttle-operation.type';
import {
  RefundRequestSchema,
  ReservationStatusEnum,
} from './user-management.type';
import { CancelStatusEnum } from './user-management.type';
import { HandyStatusEnum } from './user-management.type';

// ----- POST & PUT BODY -----

export const PostCouponBodySchema = z.object({
  code: z.string(),
});
export type PostCouponBody = z.infer<typeof PostCouponBodySchema>;

export const PostReservationBodySchema = z.object({
  shuttleRouteId: z.string(),
  type: TripTypeEnum,
  toDestinationShuttleRouteHubId: z.string().optional(),
  fromDestinationShuttleRouteHubId: z.string().optional(),
  issuedCouponId: z.string().optional(),
  isSupportingHandy: z.boolean(),
  passengerCount: z.number().int(),
});
export type PostReservationBody = z.infer<typeof PostReservationBodySchema>;

export const PostReadyPaymentBodySchema = z.object({
  reservationId: z.string(),
  issuedCouponId: z.string().nullable(),
});
export type PostReadyPaymentBody = z.infer<typeof PostReadyPaymentBodySchema>;

// ----- 임시 타입 -----

export const TempReservationSchema = z.object({
  reservationId: z.string(),
  type: TripTypeEnum,
  shuttleRouteId: z.string(),
  toDestinationShuttleRouteHubId: z.string().nullable(),
  fromDestinationShuttleRouteHubId: z.string().nullable(),
  shuttleBusId: z.string().nullable(),
  reservationStatus: ReservationStatusEnum,
  cancelStatus: CancelStatusEnum,
  paymentId: z.string().nullable(), // 250114 21:25 /v1/billing/payments API가 새로 추가되어 이제 /v2/shuttle-operation/reservations에서 paymentId는 null로 들어옵니다.
  userId: z.string(),
  handyStatus: HandyStatusEnum,
  createdAt: z.string(),
});
export type TempReservation = z.infer<typeof TempReservationSchema>;

export const TempReadyPaymentSchema = z.object({
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
  refundRequests: RefundRequestSchema.array().nullable(),
  createdAt: z.string(),
});
export type TempReadyPayment = z.infer<typeof TempReadyPaymentSchema>;

export const TempPaymentSchema = z.object({
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
  refundRequests: RefundRequestSchema.array(),
  createdAt: z.string(),
});
export type TempPayment = z.infer<typeof TempPaymentSchema>;
