import { z } from 'zod';
import {
  ShuttleRoutesViewEntitySchema,
  TripTypeEnum,
} from './shuttleRoute.type';

//  ----- ENUM -----

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

// ----- GET -----

export const ReservationsViewEntitySchema = z
  .object({
    reservationId: z.string(),
    userId: z.string(),
    userNickname: z.string(),
    userPhoneNumber: z.string(),
    userProfileImage: z.string().nullable(),
    shuttleRouteId: z.string(),
    type: TripTypeEnum,
    toDestinationShuttleRouteHubId: z.string().nullable(),
    fromDestinationShuttleRouteHubId: z.string().nullable(),
    handyStatus: HandyStatusEnum,
    reviewId: z.string().nullable(),
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
    shuttleRoute: ShuttleRoutesViewEntitySchema,
    createdAt: z.string(),
    updatedAt: z.string(),
    metadata: z.object({
      desiredHubAddress: z.string().nullable(),
      desiredHubLatitude: z.number().nullable(),
      desiredHubLongitude: z.number().nullable(),
    }),
  })
  .strict();
export type ReservationsViewEntity = z.infer<
  typeof ReservationsViewEntitySchema
>;
