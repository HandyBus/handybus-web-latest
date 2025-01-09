import { TripType } from '@/types/shuttle.types';
import { authInstance } from './config';
import { CancelStatusType, ReservationStatusType } from '@/types/client.types';

// TODO: 추후 타입 정리 필요
interface PostBillingReservationRes {
  reservationId: number;
  type: TripType;
  shuttleRouteId: number;
  toDestinationShuttleRouteHubId: number;
  fromDestinationShuttleRouteHubId: number;
  shuttleBusId?: number;
  reservationStatus: ReservationStatusType;
  cancelStatus: CancelStatusType;
  paymentId: string;
  userId: string;
  handyStatus: string;
  createdAt: string;
}

export const postBillingReservation = async (body: {
  shuttleRouteId: number;
  type: TripType;
  toDestinationShuttleRouteHubId?: number;
  fromDestinationShuttleRouteHubId?: number;
  issuedCouponId?: number;
  isSupportingHandy: boolean;
  passengers: {
    name: string;
    phoneNumber: string;
  }[];
}) => {
  const res = await authInstance.post<{
    reservation: PostBillingReservationRes;
  }>('/v1/billing/reservations', body);
  return res.reservation;
};

// TODO: return 값 타입 정리
export const postBillingPayment = async (
  paymentId: string,
  paymentKey: string,
) => {
  const res = await authInstance.post<{
    payments: {
      paymentId: string;
      reservationId: number;
      issuedCouponId: number;
      pgType: 'TOSS';
      principalAmount: number;
      earlybirdDiscountAmount: number;
      paymentAmount: number;
      couponDiscountAmount: number;
      discountAmount: number;
      refundableAmount: number;
      refundRequests: {
        paymentId: string;
        principalAmount: number;
        previousRefundableAmount: number;
        refundAmount: number;
        refundReason: string;
        afterRefundableAmount: number;
        refundAt: string;
        failedReason: string;
        status: string;
        createdAt: string;
      };
      createdAt: string;
    };
  }>(`/v1/billing/payments/${paymentId}`, {
    paymentKey,
    pgType: 'TOSS',
  });
  return res.payments;
};
