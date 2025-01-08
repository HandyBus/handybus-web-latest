export interface BillingReservations {
  reservationId: number;
  type: 'TO_DESTINATION' | 'FROM_DESTINATION';
  shuttleRouteId: number;
  pickupHubId: number;
  dropoffHubId: number;
  shuttleBusId: number;
  reservationStatus: 'NOT_PAYMENT' | 'PAYMENT_COMPLETED' | 'PAYMENT_FAILED';
  cancelStatus: 'NONE' | 'CANCELLED';
  paymentId: string;
  userId: number;
  handyStatus: 'NOT_SUPPORTED' | 'SUPPORTED';
  createdAt: string;
}

export interface PaymentReservation {
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
}
