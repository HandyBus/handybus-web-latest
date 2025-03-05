import { z } from 'zod';
import { TripTypeEnum } from './shuttle-operation.type';
import {
  RefundRequestsInPaymentsViewEntitySchema,
  ReservationStatusEnum,
} from './user-management.type';
import { CancelStatusEnum } from './user-management.type';
import { HandyStatusEnum } from './user-management.type';

// ----- POST & PUT BODY -----

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

// ----- 임시 타입 -----

export const ReserveResponseSchema = z.object({
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
