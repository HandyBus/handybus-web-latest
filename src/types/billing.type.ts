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
  shuttleRouteId: z.number(),
  type: TripTypeEnum,
  toDestinationShuttleRouteHubId: z.number().optional(),
  fromDestinationShuttleRouteHubId: z.number().optional(),
  issuedCouponId: z.number().optional(),
  isSupportingHandy: z.boolean(),
  passengers: z
    .object({
      name: z.string(),
      phoneNumber: z.string(),
    })
    .array(),
});
export type PostReservationBody = z.infer<typeof PostReservationBodySchema>;

// ----- 임시 타입 -----

export const TempReservationSchema = z.object({
  reservationId: z.number(),
  type: TripTypeEnum,
  shuttleRouteId: z.number(),
  toDestinationShuttleRouteHubId: z.number().nullable(),
  fromDestinationShuttleRouteHubId: z.number().nullable(),
  shuttleBusId: z.number().nullable(),
  reservationStatus: ReservationStatusEnum,
  cancelStatus: CancelStatusEnum,
  paymentId: z.string(),
  userId: z.string(),
  handyStatus: HandyStatusEnum,
  createdAt: z.string(),
});
export type TempReservation = z.infer<typeof TempReservationSchema>;

export const TempPaymentSchema = z.object({
  paymentId: z.string(),
  reservationId: z.number(),
  issuedCouponId: z.number(),
  pgType: z.enum(['TOSS']),
  principalAmount: z.number(),
  earlybirdDiscountAmount: z.number(),
  paymentAmount: z.number(),
  couponDiscountAmount: z.number(),
  discountAmount: z.number(),
  refundableAmount: z.number(),
  refundRequests: RefundRequestSchema.array(),
  createdAt: z.string(),
});
export type TempPayment = z.infer<typeof TempPaymentSchema>;
